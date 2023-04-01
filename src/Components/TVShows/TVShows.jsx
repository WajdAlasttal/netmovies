import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SearchTvResults from '../Search/SearchTvResults';
import image from '../../images/noimage.jpg';

export default function TVShows(props) {
    const results = props.results;
    console.log(results);
    const [tvshows,setTvshows] = useState([]);
    
    const getShows = async()=>{
        const {data}=await axios.get('https://api.themoviedb.org/3/discover/tv?api_key=c2db102a90b57fa5e0517e57a07ffe3f');
        setTvshows(data.results);
    }
    useEffect(()=>{
        getShows();
    },[]);
  return (
    <>
    <div className='container py-3'>
    <div className="row">  
    {(results.length == 0)?tvshows.map((tvshow)=>{
      return(
         <div key={tvshow.id} className='col-sm text-center'>
            <Link to={`/tvshows/${tvshow.name}/${tvshow.id}`}><img src={tvshow.poster_path ? 'https://image.tmdb.org/t/p/w500'+ tvshow.poster_path :image} alt={tvshow.name} width="200" height="250" className="rounded"/></Link>
            <h3>{tvshow.name}</h3>
       </div>
      );  
    }):<SearchTvResults results={results} />} 
    </div>
    </div>
    </>
  )
}
