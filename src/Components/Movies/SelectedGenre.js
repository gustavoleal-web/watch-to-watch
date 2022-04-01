import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Media from '../Movies/Media';
import MenuOfCanvas from '../Header/menuOfCanvas';
import styles from '../Movies/css/movies.module.css';
import globalStyles from '../Movies/css/global.module.css'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';



const SelectedGenre = () => {
    const params = useParams();
    const [ mediaByGenre, setMediaByGenre ] = useState( [] );

    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ maxPages, setMaxPages ] = useState( 0 );
    const [ hasMore, setHasMore ] = useState( true );

    useEffect( () => {
        const fetchMediaByGenres = async () => {

            try {
                let response = await axios.get( `/${ params.type }/byGenre/?genreId=${ params.genreId }&page=${ 1 }` );

                let responseCopy = [ ...response.data.results.results ];
                console.log( response.data.results.results )

                //adding the same key found in movies so it matches with shows 
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

                setMediaByGenre( responseCopy );
                setMaxPages( response.data.results.total_pages )

            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchMediaByGenres();
    }, [ params.type, params.genreId ] );


    const fetchMoreData = async () => {
        if ( currentPage > ( maxPages / 4 ) ) {
            setHasMore( false );
            return;
        }

        let nextPage = currentPage + 1;
        let response = await axios.get( `/${ params.type }/byGenre/?genreId=${ params.genreId }&page=${ nextPage }`);

        const updatedGenreList = [ ...mediaByGenre, ...response.data.results.results ];

        setMediaByGenre( updatedGenreList )
        setCurrentPage( nextPage );
    }


    if ( mediaByGenre.length > 0 ) {
        return <Fragment>
            <MenuOfCanvas type={ params.type } />

            <div className={ styles.mainContainer }>

                <h2 className={ styles.title }> { params.genreOption }</h2>

                    <InfiniteScroll
                        dataLength={ mediaByGenre.length }
                        next={ fetchMoreData }
                        hasMore={ hasMore }
                        loader={ <h4>Loading...</h4> }
                        endMessage={
                            <p style={ { textAlign: 'center' } }>
                                <b>End of the line.</b>
                            </p> }>

                        <div className={ globalStyles.gridContainer }>
                            {
                                mediaByGenre.map( ( g ) =>
                                    <Media
                                        key={ g.id }
                                        id={ g.id }
                                        title={ g.title }
                                        releaseDate={ g.release_date }
                                        posterPath={ g.poster_path }
                                        rating={ g.vote_average }
                                        option='trending'
                                        type={ params.type }
                                        overview={ g.overview } />
                                )
                            }
                        </div>
                    </InfiniteScroll>

                </div>
        </Fragment >
    }

    else return null

}

export default SelectedGenre;