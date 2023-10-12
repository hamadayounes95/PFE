import { useEffect, useState } from "react"


export const useWindowSize =()=>{
    const [size,setSize]=useState([window.innerWidth,window.innerHeight])
    useEffect(()=>{
        const UpdateSize = ()=>{
            setSize([window.innerWidth,window.innerHeight])
        }
        window.addEventListener('resize',UpdateSize)
        return () => window.removeEventListener('resize',UpdateSize)
    },[])
    return {
        width : size[0],
        height : size[1]
    }
}
