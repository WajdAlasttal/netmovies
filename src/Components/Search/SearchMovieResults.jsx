import React from 'react'
import { Link } from 'react-router-dom';
import image from '../../images/noimage.jpg';

export default function SearchMovieResults(props) {
    const results = props.results;
  return (
   <>
   <div className='container py-3'>
    <div className="row">  
    {results.map((result) => (
         <div key={result.id} className='col-sm text-center'>
         <Link to={`/movies/${result.title}/${result.id}`}><img src={result.poster_path ? 'https://image.tmdb.org/t/p/w500'+ result.poster_path : image} alt={result.title} width="200" height="250" className="rounded"/></Link>
         <h3>{result.title}{result.name}</h3>
         </div>
      ))}
      </div>
      </div>
   </>
  )
}
