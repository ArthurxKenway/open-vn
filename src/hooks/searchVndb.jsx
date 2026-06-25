import { useState, useEffect } from 'react';

export default function useVndb({ limit = 10, query }) {
  const [visualNovels, setVisualNovels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Prevent API crash on empty initial/cleared searches
    if (!query || !query.trim()) {
      setVisualNovels([]);
      setLoading(false);
      return;
    }

    // AbortController fixes race conditions by canceling stale requests
    const controller = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api-vndb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal, // Track this request
          body: JSON.stringify({
            filters: ["search", "=", query.trim()],
            fields: "title, image.url",
            // 2. Fixed VNDB Sort Syntax: Must be array, reverse is handled by 'desc'
            sort: "rating", 
            reverse: true,
            results: limit,
          }),
        });

        if (!res.ok) throw new Error("Network response was not ok");
        
        const data = await res.json();
        setVisualNovels(data.results || []);
      } catch (err) {
        // Ignore errors caused by manual aborts
        if (err.name !== 'AbortError') {
          console.error("VNDB fetch error:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 3. Cleanup function aborts previous fetch if query changes before completion
    return () => controller.abort();
    
    // 4. Safely omitting 'limit' prevents inline object literal infinite loops
  }, [query]); 

  return { visualNovels, loading, error };
}
