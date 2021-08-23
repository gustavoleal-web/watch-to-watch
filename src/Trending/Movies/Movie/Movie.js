import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import About from './About/About';

const Movie = ( { title, releaseDate, posterPath, movieId } ) => {
    const [ movieMetaData, setMovieMetaData ] = useState( {} );


    return (

        <div style={ { border: '1px solid black', marginBottom: '20px', marginLeft: '10px', marginRight: '10px' } }>

            <div style={ { display: 'flex' } }>
                <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '200px' } } />
                <div style={ { margin: 'auto' } }>
                    <h4>{ title }</h4>
                    <p>Release Date: { releaseDate }</p>
                </div>
            </div>

            <Link to={ `movies/${ movieId }` }>Load more movie info</Link>

        </div>
    )
}

export default Movie;