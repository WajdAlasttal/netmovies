import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function MoviesGenre() {
    let [movgenres,setMovgenre] = useState([]);

    let params = useParams();
    let getMovgenre = async()=>{
        let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2db102a90b57fa5e0517e57a07ffe3f&with_genres=${params.id}`);
        setMovgenre(data.results);
    }
    useEffect(()=>{
        getMovgenre();
    },[]);

  return (
    <>
    <div className='container py-3'>
      <h2>{params.name}</h2>
    <div className="row">  
    {movgenres.map((movgenre)=>{
      return(
         <div key={movgenre.id} className='col-sm text-center'>
            <Link to={`/movies/${movgenre.title}/${movgenre.id}`}><img src={'https://image.tmdb.org/t/p/w500'+ movgenre.poster_path } alt={movgenre.title} width="200" height="250" className="rounded"/></Link>
            <h3>{movgenre.title}</h3>
       </div>
      );  
    })} 
    </div>
    </div>
    </>
  
  )
}
