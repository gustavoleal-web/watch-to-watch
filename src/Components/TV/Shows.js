import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { default as Show } from '../Movies/Media';
import styles from '../Movies/css/movies.module.css';
import MenuOfCanvas from '../Header/menuOfCanvas';
import { useParams } from 'react-router';

const Shows = () => {
    const [ tvShows, setTvShows ] = useState( {
        title: '',
        list: [],
        dates: null
    } );

    let params = useParams();

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.option }/shows` );

                setTvShows( {
                    title: params.option,
                    list: response.data.results.results,
                    dates: null
                } );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [ params.option ] );


    if ( tvShows.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        return (
            <Fragment>
                <MenuOfCanvas type='shows' />

                <div className={ styles.mainContainer }>

                    <h2 className={ styles.title }>{ tvShows.title }</h2>
                    {
                        tvShows.list.map( show =>
                            <Show id={ show.id }
                                title={ show.name }
                                releaseDate={ show.first_air_date }
                                posterPath={ show.poster_path }
                                rating={ show.vote_average }
                                option={ params.option }
                                type='shows'
                                key={ show.id }
                            /> )
                    }
                </div>
            </Fragment>
        )
    }
}

export default Shows;