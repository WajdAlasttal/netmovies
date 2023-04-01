import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchPeopleResults from '../Search/SearchPeopleResults';

export default function People(props) {
    const results = props.results;
    const[people,setPeople] = useState([]);
    const getPerson = async()=>{
      const {data} = await axios.get('https://api.themoviedb.org/3/trending/person/day?api_key=c2db102a90b57fa5e0517e57a07ffe3f');
        setPeople(data.results);
    }
    useEffect(()=>{
        getPerson();
    },[]);
  return (
    <>
    <div className='container py-3'>
    <div className="row">  
    {(results.length == 0)? people.map((person)=>{
      return(
         <div key={person.id} className='col-sm text-center'>
            <img src={'https://image.tmdb.org/t/p/w500'+ person.profile_path } alt={person.name} width="200" height="250" className="rounded"/>
            <h3>{person.name}</h3>
       </div>
      );  
    }):<SearchPeopleResults results={results}/>} 
    </div>
    </div>
    </>
  )
}
