import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const About = ( { genres, overview } ) => {
    const [ state, setState ] = useState( {} )
    const params = useParams();
   
    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/trending/show/?showId=${ params.showId }` );
                setState( response.data.results );

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
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [ params.showId ] );

    return (
        <div>
        </div>
    )
}

export default About;