import React, { useState } from 'react';
import axios from 'axios';
import About from './About/About';

const Movie = ( { title, releaseDate, posterPath, id } ) => {
    const [ movieMetaData, setMovieMetaData ] = useState( {} );


    const onClickHandler = async () => {
        let response = await axios.get( `trending/movie/?movieId=${ id }` );

        if ( response.status === 200 ) {
            setMovieMetaData( response.data.results );
        }
    }

    return (

        <div style={ { border: '1px solid black', marginBottom: '20px', marginLeft: '10px', marginRight: '10px' } }
            onClick={ onClickHandler }
        >

            <div style={ { display: 'flex' } }>
                <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '200px' } } />
                <div style={ { margin: 'auto' } }>
                    <h4>{ title }</h4>
                    <p>Release Date: { releaseDate }</p>
                </div>
            </div>


            {
                Object.keys( movieMetaData ).length === 0
                    ? null
                    : <About
                        title={ title }
                        description={ movieMetaData.overview }
                        runtime={ movieMetaData.runtime }
                        genres={ movieMetaData.genres }
                        status={ movieMetaData.status }
                        language={ movieMetaData.original_language } 
                        productionCountries = {movieMetaData.production_countries}
                        />
            }
        </div>
    )
}

export default Movie;