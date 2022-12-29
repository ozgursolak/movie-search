import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/movies?keyword=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();
		
		if (responseJson.is_success) {
			setMovies(responseJson.movies);
		}
	};

	useEffect(() => {
    if(searchValue.length > 2)
    {
		setTimeout(() => {
			getMovieRequest(searchValue);
		}, 300);
    }
	}, [searchValue]);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList movies={movies} />
			</div>
		</div>
	);
};

export default App;