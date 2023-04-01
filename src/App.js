import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Trend from './Components/Trends/Trend';
import Movies from './Components/Movies/Movies';
import TVShows from './Components/TVShows/TVShows';
import People from './Components/People/People';
import MoviesGenre from './Components/MoviesGenre/MoviesGenre';
import MovieDetails from './Components/Details/MovieDetails';
import TvshowsDetails from './Components/Details/TvshowsDetails';
import TrendingMovies from './Components/Details/TrendingMovies';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchTvResults from './Components/Search/SearchTvResults';
import SearchMovieResults from './Components/Search/SearchMovieResults';

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchResults = async () => {
    const {data} = await axios.get(
       `https://api.themoviedb.org/3/search/multi?api_key=c2db102a90b57fa5e0517e57a07ffe3f&query=${query}`);
    setResults(data.results);
    
  };

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="App">
     <Navbar  handleInputChange={handleInputChange} query={query} />
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/signin' element={<Signin />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/genre/:name/:id' element={<MoviesGenre/>}></Route>
      <Route path='/movies' element={<Movies  results={results} /> }></Route>
      <Route path='/movies/:name/:id' element={<MovieDetails/>}></Route>
      <Route path='/tvshows/:name/:id' element={<TvshowsDetails/>}></Route>
      <Route path='/tvshows' element={<TVShows results={results} />}></Route>
      <Route path='/trending' element={<Trend />}></Route>
      <Route path='/trending/movies/:name/:id' element={<TrendingMovies />}></Route>
      <Route path='/people' element={<People  results={results} />}></Route>
      <Route path='/results'  element={<SearchMovieResults  results={results} />}></Route>
      <Route path='/results'  element={<SearchTvResults  results={results} />}></Route>
     </Routes>
    
     <Footer />
    </div>
  );
}


export default App;
