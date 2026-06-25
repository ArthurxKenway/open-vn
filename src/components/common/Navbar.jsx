import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {

    const container = useRef()
    const logoText =  "OpenVN"
    
    useGSAP(()=> {
        gsap.from('.logo-char', {
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


    return(
        <>
        <nav className="flex bg-black m-5 ml-10 mr-10 p-5 pl-10 pr-10 rounded-full text-white items-center justify-between" ref={container}>
            <Link to="/" className=''>
            {logoText.split("").map((char, index) =>(
                <span key={index} className='logo-char inline-block'>{char}</span>
            ))}
            </Link>
            <ul className="flex gap-10">
                <li><Link to="/browse"><span>Browse</span></Link></li>
                <li>Search</li>
                <li>Profile</li>
            </ul>
        </nav>
        </>
    )
}