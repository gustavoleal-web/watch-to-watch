import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import Provider from './Provider';
//You can link to the provided TMDB URL to help support TMDB and provide the actual deep links to the content.
//Please note: In order to use this data you must attribute the source of the data as JustWatch. 
//If we find any usage not complying with these terms we will revoke access to the API.

const Providers = ( { movieId } ) => {
    const [ state, setState ] = useState( {
        link: '',
        stream: [],
        rent: [],
        buy: []
    } );

    const [ noProviers, setNoProviders ] = useState( false );


    //returns obj
    //US
    //buy
    //rent
    //flatrate -> streaming service
    //images => https://image.tmdb.org/t/p/w300/${logo_path}

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/movie/providers/?movieId=${ movieId }` );
                let stateCopy = { ...state };
                let results

                if ( Object.keys( response.data.results.results ).includes( 'US' ) ) {
                    results = response.data.results.results.US;
                    stateCopy.link = results.link !== undefined ? results.link : '';
                    stateCopy.stream = results.flatrate !== undefined ? results.flatrate : [];
                    stateCopy.buy = results.buy !== undefined ? results.buy : [];
                    stateCopy.rent = results.rent !== undefined ? results.rent : [];
                    setState( stateCopy );
                }

                else {
                    setNoProviders( true )
                }

            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
        // eslint-disable-next-line
    }, [ movieId ] );


    if ( noProviers ) {
        return <p>No servies at this time.</p>
    }

    else {
        return <Fragment>
            <p>Source:JustWatch</p>

            <Provider service={ state.stream } serviceName='Stream' />
            <Provider service={ state.buy } serviceName='Buy' />
            <Provider service={ state.rent } serviceName='Rent' />

        </Fragment>
    }
}

export default Providers;