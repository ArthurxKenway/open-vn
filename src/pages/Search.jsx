import React, { useState } from 'react'
import searchVndb from '../hooks/searchVndb'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {useRef} from 'react'

const Search = () => {
    const container = useRef(null)
    const text = "Search for sauce!"

    useGSAP(()=> {
        gsap.from('.search-char', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'bounce.out',
            stagger: {
                each: 0.05,
                from: 'random'
            }
        })
    }, {scope: container});



    const [searchValue, setSearchValue] = useState('');
    const [selectedVN, setSelectedVN] = useState(null)
    const [overlay, setOverlay] = useState(false);
  
    const { visualNovels, loading, error } = searchVndb({ limit: 10, query: searchValue });

    return (
    
        <div className='relative flex flex-col justify-center items-center w-[100vw] mt-30 h-[100vh]]'>
           <div ref={container} className="flex gap-1 text-[50px] font-bold mb-4">
                {text.split("").map((char, index) => (
                    <label htmlFor="search" key={index} className='search-char inline-block'>
                        {char === " " ? "\u00A0" : char}
                    </label>
                ))}
            </div>
            
            <input 
                type="text" 
                name='search'   
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)}  
                className='bg-white w-[1000px] h-[50px] rounded-full p-5 text-black' 
                placeholder='YuuWaku'
            />
            
            {loading && <p className="mt-4 text-xl">Loading sauce...</p>}
            {error && <p className="mt-4 text-red-500">Error: {error}</p>}

            <div className="card-container flex mt-5 gap-10 flex-wrap justify-center">
                {visualNovels.map((vn) => (

                    <div 
                        key={vn.title} 
                        className="card bg-black rounded-lg flex flex-col gap-3 p-4 w-64 cursor-pointer" 
                        onClick={() => setOverlay(true)} 
                    >
                        {vn.image?.url ? (
                            <img 
                                src={vn.image.url} 
                                alt={vn.title} 
                                className="h-80 w-full object-cover rounded-[5px] hover:scale-110 transition-all duration-500" 
                            />
                        ) : (
                            <div className="h-80 w-full bg-neutral-800 flex items-center justify-center rounded-[5px] text-gray-400">
                                No Image Available
                            </div>
                        )}
                        <h3 className="text-white font-bold truncate">{vn.title}</h3>
                    </div>
                ))}
            </div>


            {overlay && (
                <div className='fixed inset-0 text-white overlay bg-black/90 p-10 z-50 overflow-y-auto'>
                    <button 
                        onClick={() => setOverlay(false)} 
                        className='absolute top-5 right-5 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full'
                    >
                        ✕ Close
                    </button>

                    <h2 className='text-white text-6xl font-bold mb-6'>Senren Banka</h2>
                    <div className='flex p-5 gap-10'>
                        <div className='font-bold w-32'>Developer</div>
                        <div>YuzuSoft</div>
                    </div>
                    <div className='flex p-5 gap-10'>
                        <div className='font-bold w-32'>Aliases</div>
                        <div>Senren * Banka: A Thousand Colors of Love</div>
                    </div>
                    <div className='flex p-5 gap-10'>
                        <div className='font-bold w-32'>Playtime</div>
                        <div>Long (45h30m from 265 votes)</div>
                    </div>
                    <div className='flex p-5 gap-10'>
                        <div className='font-bold w-32'>Publishers</div>
                        <div>Yuzusoft & HIKARI FIELD & NekoNyan & Limited Run Games</div>
                    </div>
                    <div className='flex p-5 gap-10'>
                        <div className='font-bold w-32'>Description</div>
                        <div className='flex-1'>The village of Hoori lies deep in the middle of the mountains...</div>
                    </div>
                </div> 
            )}
        </div>
    );
};

export default Search;
