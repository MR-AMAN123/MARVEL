import React, { useEffect, useState } from 'react'
import { Card } from './Card'
import axios from "axios"
export const Main = () => {
    const [url,seturl]=useState("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=378fc229668545804f19dfc2de4c33e8&hash=371d1b33b05670978e46be0629db05b0")
   const [item,setitem]=useState();
   const [search,setSearch]=useState("");
   
    useEffect(()=>{
        const fetch=async()=>{
            const res=await axios.get(url)
            setitem(res.data.data.results);
        }
        fetch();
    },[url])
 
    const searchMarvel=()=>{
        seturl(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=378fc229668545804f19dfc2de4c33e8&hash=371d1b33b05670978e46be0629db05b0`)
      }
    return (
    <>
    <div className="header">
        <div className="bg">
            <img src="./bg.png" alt="" />
        </div>
        <div className="search-bar">
            <img src="./logo.jpg" alt="logo" />
            <input type="search" placeholder='Search Here' className='search'  onChange={e=>setSearch(e.target.value)}
                 onKeyDown={searchMarvel}/>
        </div>
    </div>
    <div className="content">
        
       {
        (!item) 
        ? <div className="loading">
            <img src="./load.gif" alt="Loading..." />
          </div>
        : <Card data={item}/>
       }
    </div>
    </>
  )
}
