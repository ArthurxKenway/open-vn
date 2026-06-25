import { useState, useEffect } from 'react'

export default function useVndb(limit=10) {
    const [visualNovels, setVisualNovel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://api.vndb.org/v2/vn';

        fetch('/api-vndb', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filters: ["id", ">=", "v1"],
                fields: "title, image.url",
                sort: "rating",
                reverse: true,
                results: limit,
                page: 1
            })
        })
        .then((res)=> {
            if(!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data)=> {
            setVisualNovel(data.results || []);
            setLoading(false)
        })
        .catch((err)=> {
            console.error("VNDB fetch error:", err);
            setError(err.message);
            setLoading(false);
        })

    }, [limit])
    
    return {visualNovels, loading, error}
}