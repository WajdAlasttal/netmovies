import React from 'react'
import image from '../../images/no-photo_1.png';

export default function SearchPeopleResults(props) {
    const results = props.results;
  return (
    <div className='container py-3'>
    <div className="row">  
    {results.map((result) => (
         <div key={result.id} className='col-sm text-center'>
         <img src={result.profile_path ? 'https://image.tmdb.org/t/p/w500'+ result.profile_path : image } alt={result.name} width="200" height="250" className="rounded"/>
         <h3>{result.name}</h3>
    </div>
      ))}
      </div>
      </div>
  )
}
