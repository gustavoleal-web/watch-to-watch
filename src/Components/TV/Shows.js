import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Show from './Show';
import styles from '../Movies/css/movies.module.css';
import MenuOfCanvas from '../Header/menuOfCanvas';
import { useParams } from 'react-router';

const Shows = () => {
    const [ tvShows, setTvShows ] = useState( [] );
    // const [ searchName, setsearchName ] = useState( '' );
    let params = useParams();

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.option }/shows` );

                setTvShows( response.data.results.results );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [ params.option ] );


    // const onChangeHandler = ( e ) => {
    //     setsearchName( e.target.value );
    // }

    // const onClickHandler = async () => {
    //     if ( searchName.length > 3 ) {
    //         let url = `/search/tv/?tvShow=${ searchName }`;

    //         try {
    //             let response = await axios.get( url );
    //             console.log( response.data.results.results );
    //             setTvShows( response.data.results.results );
    //         }
    //         catch ( e ) {
    //             console.log( e )
    //         }

    //     }

    // }


    if ( tvShows.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        return (
            <Fragment>
                <MenuOfCanvas type='shows' />
                <div className={ styles.mainContainer }>

                    <h2 className={ styles.title }>{ params.option }</h2>
                    {
                        tvShows.map( show =>
                            <Show showId={ show.id }
                                name={ show.name }
                                airDate={ show.first_air_date }
                                posterPath={ show.poster_path }
                                backdropPath={ show.backdrop_path }
                                rating={ show.vote_average }
                                option={ params.option }
                                key={ show.id }
                            /> )
                    }
                </div>
            </Fragment>
        )
    }
}

export default Shows;