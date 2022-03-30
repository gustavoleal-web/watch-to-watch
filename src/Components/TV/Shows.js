import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { default as Show } from '../Movies/Media';
import globalStyles from '../Movies/css/global.module.css';
import styles from '../Movies/css/movies.module.css';
import MenuOfCanvas from '../Header/menuOfCanvas';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';

const Shows = () => {
    const [ tvShows, setTvShows ] = useState( {
        title: '',
        list: [],
        dates: null
    } );

    let params = useParams();
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ maxPages, setMaxPages ] = useState( 0 );
    const [ hasMore, setHasMore ] = useState( true );


    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.option }/shows/?page=${ 1 }` );

                setTvShows( {
                    title: params.option,
                    list: response.data.results.results,
                    dates: null
                } );

                setMaxPages( response.data.results.total_pages );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [ params.option ] );


    const fetchMoreData = async () => {
        if ( currentPage > ( maxPages / 4 ) ) {
            setHasMore( false );
            return;
        }

        let nextPage = currentPage + 1;
        let response = await axios.get( `/${ params.option }/shows/?page=${ nextPage }` );

        const updatedTvList = [ ...tvShows.list, ...response.data.results.results ];

        setTvShows( {
            ...tvShows, list: updatedTvList,
        } );

        setCurrentPage( nextPage );
    }

    if ( tvShows.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        return (
            <Fragment>
                <MenuOfCanvas type='shows' />

                <div className={ styles.mainContainer }>
                    <h2 className={ styles.title }>{ tvShows.title }</h2>

                    <InfiniteScroll
                        dataLength={ tvShows.list.length } //This is important field to render the next data
                        next={ fetchMoreData }
                        hasMore={ hasMore }
                        loader={ <h4>Loading...</h4> }
                        endMessage={
                            <p style={ { textAlign: 'center' } }>
                                <b>End of the line.</b>
                            </p> }>

                        <div className={ globalStyles.gridContainer }>
                            {
                                tvShows.list.map( ( show, i ) =>

                                    <Show id={ show.id }
                                        title={ show.name }
                                        releaseDate={ show.first_air_date }
                                        posterPath={ show.poster_path }
                                        rating={ show.vote_average }
                                        option={ params.option }
                                        type='shows'
                                        overview={ show.overview }
                                        key={ show.id }
                                    />
                                )
                            }
                        </div>
                    </InfiniteScroll>
                </div>
            </Fragment>
        )
    }
}

export default Shows;