import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Media from './Media';
import styles from '../Movies/css/movies.module.css';
import MenuOfCanvas from '../Header/menuOfCanvas';

const SearchedMedia = () => {
    const params = useParams();

    const [ searchResults, setSearchResults ] = useState( {
        title: params.searchName,
        searchList: [],
    } )

    useEffect( () => {
        const fetchMovies = async () => {
            if ( params.searchName.length >= 3 ) {
                let url = `/search/${ params.type }/?searchName=${ params.searchName }`;

                try {
                    let response = await axios.get( url );
                    let responseCopy = [ ...response.data.results.results ];

                    //changing the keys: name, first_air_date, and release_date in show to the key names found in movies
                    //prevents the props from being undefined in the key name is different
                    if ( responseCopy.length > 0 ) {
                        for ( let i = 0; i < responseCopy.length; i++ ) {
                            if ( responseCopy[ i ].name ) {
                                responseCopy[ i ].title = responseCopy[ i ].name;
                                responseCopy[ i ].original_title = responseCopy[ i ].original_name;
                            }
                            if ( responseCopy[ i ].first_air_date ) {
                                responseCopy[ i ].release_date = responseCopy[ i ].first_air_date;
                            }
                        }
                    }

                    setSearchResults( { title: params.searchName, searchList: responseCopy } )

                }
                catch ( e ) {
                    console.log( e )
                }
            }
        }
        fetchMovies();
    }, [ params.type, params.searchName ] );


    if ( searchResults.searchList.length > 0 ) {
        return (
            <Fragment>
                <MenuOfCanvas type={ params.type } />

                <div className={ styles.mainContainer }>

                    <h3 className={ styles.title }> Search results for '{ searchResults.title }'</h3>

                    <div className={ styles.moviesContainer }>
                        {
                            searchResults.searchList.map( r =>
                                <Media
                                    id={ r.id }
                                    title={ r.title }
                                    releaseDate={ r.release_date }
                                    posterPath={ r.poster_path }
                                    rating={ r.vote_average }
                                    option='trending'
                                    type={ params.type }
                                    key={ r.id } /> )
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
    else return null
}

export default SearchedMedia;