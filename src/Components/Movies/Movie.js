import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/movie.module.css';

const Movie = ( { title, releaseDate, posterPath, movieId } ) => {

    return (

        <div className={ styles.movieContainer }>
            <div className={ styles.movieDisplay }>
                <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '200px ' } } />
                <div className={ styles.movieMain }>
                    <h4>{ title }</h4>
                    <p>Release Date: { releaseDate }</p>
                </div>
            </div>

            <Link to={ `movies/${ movieId }` }>Load more movie info</Link>

        </div>
    )
}

export default Movie;