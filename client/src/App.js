import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

import { updateMovieList, clearMovieList } from "./state/slice/MovieSlice";
import { updateLoading } from "./state/slice/CommonSlice";

const App = () => {
	const dispatch = useDispatch();

	const movies = useSelector((state) => state.movie.movieList);
  	const isLoading = useSelector((state) => state.common.isLoading);

	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = useCallback(
		async (searchValue) => {
		const url = `http://0.0.0.0:${process.env.REACT_APP_SERVER_PORT}/movies?keyword=${searchValue}`;
		const response = await fetch(url);
		const responseJson = await response.json();

		dispatch(updateLoading(false));

		if (responseJson.is_success) {
			dispatch(updateMovieList(responseJson.movies));
		}
		},
		[dispatch]
  	);

	useEffect(() => {
		if(searchValue.length > 2)
		{
			dispatch(updateLoading(true));
			const timeoutId = setTimeout(() => {
				getMovieRequest(searchValue);
			}, 300);

			return () => {
				dispatch(updateLoading(false));
				clearTimeout(timeoutId)
			};
		}
		else if(searchValue.length<=2)
		{
			dispatch(clearMovieList());
		}
	}, [searchValue, getMovieRequest, dispatch]);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				{isLoading ? 
				<div className="spinner-grow spinner-grow-sm-center" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				: <MovieList movies={movies} />}
			</div>
		</div>
	);
};

export default App;