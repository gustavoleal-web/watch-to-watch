import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/movie.module.css';

const Movie = ( { title, releaseDate, posterPath, movieId, option } ) => {
    let linkPath = `/movies/${ option }/${ movieId }`;

    //converts yyyy-mm-dd to mm/dd/yyyy
    let regex = /(\d{4})-(\d{1,2})-(\d{1,2})/
    let str = releaseDate;
    let mmddyyyy = str.replace( regex, '$2/$3/$1' );

    return (

        <div className={ styles.movieContainer }>
            <div className={ styles.movieDisplay }>
                <Link to={ linkPath }>
                    <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '200px ' } } />
                </Link>
                <div className={ styles.movieMain }>
                    <h4>{ title }</h4>
                    <p>{ mmddyyyy }</p>
                </div>
            </div>



        </div>
    )
}


export default Movie;