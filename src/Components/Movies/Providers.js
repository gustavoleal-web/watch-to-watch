import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import Provider from './Provider';
import styles from '../Movies/css/providers.module.css'
//You can link to the provided TMDB URL to help support TMDB and provide the actual deep links to the content.
//Please note: In order to use this data you must attribute the source of the data as JustWatch. 
//If we find any usage not complying with these terms we will revoke access to the API.

const Providers = ( { id, mediaType } ) => {
    const [ state, setState ] = useState( {
        link: '',
        stream: [],
        rent: [],
        buy: []
    } );

    const [ noProviers, setNoProviders ] = useState( false );

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/${ mediaType }/providers/?id=${ id }` );
                let stateCopy = { ...state };
                let results;

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
    }, [ id, mediaType ] );


    if ( noProviers ) {
        return <p className={ styles.noProvider }>
            No streaming services available at this time. Visit the official website for more details.
        </p>
    }

    else {
        return <Fragment>
            <Provider service={ state.stream } serviceName='Stream' />
            <Provider service={ state.buy } serviceName='Buy' />
            <Provider service={ state.rent } serviceName='Rent' />

            <p className={ styles.providerSource }>Source: JustWatch</p>
        </Fragment>
    }
}

export default Providers;