import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Show from './Show/Show';

const Shows = () => {
    const [ tvShows, setTvShows ] = useState( [] );

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `http://localhost:3001/trending/shows` );
                setTvShows( response.data.results.results );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [] );


    if ( tvShows.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        return (
            <div>
                <h2>Trending TV Shows</h2>
                {
                    tvShows.map( show => <Show id={ show.id } name={ show.name } airDate={ show.first_air_date } posterPath={ show.poster_path } key={ show.id } /> )
                }
            </div>
        )
    }
}

export default Shows;