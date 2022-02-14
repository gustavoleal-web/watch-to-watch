import React, { useState, useEffect, Fragment } from 'react';
import MenuOfCanvas from '../Header/menuOfCanvas';
import Media from '../Movies/Media';
import styles from './css/movies.module.css';
import { useParams } from 'react-router';
import axios from 'axios';

const CustomSearchResults = () => {
    const params = useParams();

    const [ state, setState ] = useState( {
        title: '',
        list: [],
        dates: null
    } );

    useEffect( () => {
        const fetchSearchOptions = async () => {
            try {
                const response = await axios.get(
                    `/${ params.type }/releaseYear/genre/language/rating/?year=${ params.releaseYear }&originalLang=${ params.language }&rating=${ params.rating }&genre=${ params.genre }` );

                let results = response.data.results;
                console.log( results.results );

                setState( {
                    title: params.type,
                    list: results.results,
                    dates: null
                } )
            }

            catch ( error ) {
                console.log( error )
            }
        }
        fetchSearchOptions();
    }, [ params ] )

    if ( state.list.length === 0 ) {
        return <h1>No results found</h1>
    }

    else {
        return <Fragment>
            <MenuOfCanvas type={ params.type } />

            <h2 className={ styles.title }>{ params.type } results</h2>

            { state.list.map( item =>
                <Media
                    key={ item.id }
                    id={ item.id }
                    title={ item.title }
                    releaseDate={ item.release_date }
                    posterPath={ item.poster_path }
                    rating={ item.vote_average }
                    option='customResults'
                    type={ params.type }
                />
            ) }
        </Fragment>



    }


}

export default CustomSearchResults;