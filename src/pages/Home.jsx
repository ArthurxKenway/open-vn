import React from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useVndb from '../hooks/useVndb'


gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    const {visualNovels, loading, error} =  useVndb(10);
    const container = useRef()
    
    useGSAP(() => {
        gsap.from('.banner', {

            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".banner",
                start: "top 85%", 
                toggleActions: "play none none none"
            }
        })
    }, { scope: container })

    return (
        <div className='m-5' ref={container}>
          
            <div className="w-full bg-neutral-950 rounded-lg overflow-hidden h-[250px]">
                <img 
                    src="https://www.hibiki-site.com/img/top68c.jpg" 
                    alt="Vn Cover Banner" 
                  
                    className="banner h-full w-full object-cover object-[50%_15%] [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%)]"
                />
            </div>


            <div className='Trending flex flex-col mt-10'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className="text-[30px]">Trending Now</h1>
                    <button className='bg-black pl-5 pr-5 p-2 rounded-[5px] text-white'>Search</button>
                </div>

                <div className="card-container flex mt-5 gap-10 flex-wrap">
                    {visualNovels.map((vn)=> (
                        <div key={vn.id} className="card bg-neutral-900/40 rounded-lg flex flex-col gap-3">
                            <img src={vn.image.url} alt={vn.title} className="h-80 w-full object-cover rounded-[5px] hover:scale-110 transition-all duration-0.5" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home