import React, { useState, useEffect, Fragment } from 'react';
import MenuOfCanvas from '../Header/menuOfCanvas';
import Media from '../Movies/Media';
import styles from './css/movies.module.css';
import { useParams } from 'react-router';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

//component no returning correct list for tv shows. 
//works fine for movies. 

const CustomSearchResults = () => {
    const params = useParams();

    const [ state, setState ] = useState( {
        title: '',
        list: [],
        dates: null
    } );

    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ maxPages, setMaxPages ] = useState( 0 );
    const [ hasMore, setHasMore ] = useState( true );

    useEffect( () => {
        const fetchSearchOptions = async () => {
            try {
                const response = await axios.get(
                    `/${ params.type }/releaseYear/genre/language/rating/?year=${ params.releaseYear }&originalLang=${ params.language }&rating=${ params.rating }&genre=${ params.genre }&type=${ params.type }&page=${ 1 }` );

                let responseResults = response.data.results;
                let responseCopy = [ ...responseResults.results ];

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

                setState( {
                    title: params.type,
                    list: responseCopy,
                    dates: null
                } )

                setMaxPages( response.data.results.total_pages );
            }

            catch ( error ) {
                console.log( error )
            }
        }
        fetchSearchOptions();
    }, [ params ] )

    const fetchMoreData = async () => {
        if ( currentPage >  maxPages  ) {
            setHasMore( false );
            return;
        }

        let nextPage = currentPage + 1;
        let response = await axios.get( 
            `/${ params.type }/releaseYear/genre/language/rating/?year=${ params.releaseYear }&originalLang=${ params.language }&rating=${ params.rating }&genre=${ params.genre }&type=${ params.type }&page=${ nextPage }` );

        const updatedTvList = [ ...state.list, ...response.data.results.results ];
        console.log( updatedTvList)

        setState( {
            ...state, list: updatedTvList,
        } );

        setCurrentPage( nextPage );
    }


    if ( state.list.length === 0 ) {
        return <h1>No results found</h1>
    }

    else {
        return <Fragment>
            <MenuOfCanvas type={ params.type } />

            <h2 className={ styles.title }>{ params.type } results</h2>

            <InfiniteScroll
                dataLength={ state.list } //This is important field to render the next data
                next={ fetchMoreData }
                hasMore={ hasMore }
                loader={ <h4>Loading...</h4> }
                endMessage={
                    <p style={ { textAlign: 'center' } }>
                        <b>End of the line.</b>
                    </p> }
            >

                {
                    state.list.map( item =>
                        <Media
                            key={ item.id }
                            id={ item.id }
                            title={ item.title }
                            releaseDate={ item.release_date }
                            posterPath={ item.poster_path }
                            rating={ item.vote_average }
                            option='customResults'
                            type={ params.type }
                        /> )
                }
            </InfiniteScroll>
        </Fragment>
    }


}

export default CustomSearchResults;