import React, { useState } from 'react';
import axios from 'axios';
import About from './About/About';


const Show = ( { id, name, airDate, posterPath } ) => {
    const [ showMetaData, setShowMetaData ] = useState( {} )

    const onClickHandler = async () => {
        let response = await axios.get( `trending/show/?TVid=${ id }` );

        if ( response.status === 200 ) {
            setShowMetaData( response.data.results );
            //props to pass About component
            //genres
            //first_air_date
            //last_air_date
            //last_episode_to_air
            //next_episode_to_air (if any)
            //number_of_episodes
            //number_of_seasons
            //seasons
            //overview
        }

    }

    return (
        <div style={ { border: '1px solid black', marginBottom: '20px', marginLeft: '10px', marginRight: '10px' } } onClick={ onClickHandler }>

            <div style={ { display: 'flex' } }>
                <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '200px' } } />
                <div style={ { margin: 'auto' } }>
                    <h4>{ name }</h4>
                    <p>Air Date: { airDate }</p>
                </div>
            </div>

            {
                Object.keys( showMetaData ).length === 0 ? null : <About genres={ showMetaData.genres } overview={ showMetaData.overview } />
            }

        </div>
    )
}

export default Show;