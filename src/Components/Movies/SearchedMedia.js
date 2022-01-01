import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Media from './Media';
import styles from '../Movies/css/movies.module.css';
import MenuOfCanvas from '../Header/menuOfCanvas';


//tv shows and movies have different names for similar properties
//for example one has the key title and the other has the key name 
//solution: create a new object that will have the same key name

const SearchedMedia = () => {
    const [ searchResults, setSearchResults ] = useState( {
        title: '',
        searchList: [],
    } )
    const params = useParams();

    useEffect( () => {
        const fetchMovies = async () => {
            if ( params.searchName.length >= 3 ) {
                let url = `/search/${ params.type }/?searchName=${ params.searchName }`;

                try {
                    let response = await axios.get( url );
                    setSearchResults( { title: params.searchName, searchList: response.data.results.results } )

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

                    <h2 className={ styles.title }>{ params.searchName }</h2>

                    <div className={ styles.moviesContainer }>
                        {
                            searchResults.searchList.map( r =>
                                <Media
                                    id={ r.id }
                                    title={ r.name }
                                    releaseDate={ r.first_air_date }
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