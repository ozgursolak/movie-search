import React from 'react';

const placeholderImage =
    'https://w7.pngwing.com/pngs/275/309/png-transparent-cinema-film-popcorn-food-film-poster-clapperboard-thumbnail.png'

const onImageError = (e) => {
	e.target.src = placeholderImage
}
	
const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie) => (
				<div className="col-md-4">
					<div className='image-container d-flex justify-content-start m-3'>
						<figure>
							<img class="movie-img" src={movie.Poster ? movie.Poster : placeholderImage} alt='movie' onError={onImageError}></img>
							<figcaption>{movie.Title}</figcaption>
						</figure>
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
