import React, { useState, useEffect, Fragment } from 'react';
import Card from 'react-bootstrap/Card'
import Seasons from './Seasons';
import MenuOfCanvas from '../Header/menuOfCanvas';
import Sypnosis from '../Movies/Accordion';
import Trailers from '../Movies/Trailers';
import Providers from '../Movies/Providers';
import Recommendations from '../Movies/Recommendations';
import styles from '../Movies/css/about.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const About = () => {
    const [ state, setState ] = useState( {} );
    const [ trailers, setTrailers ] = useState( [] );
    const [ recommended, setRecommended ] = useState( [] );
    const params = useParams();

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/${ params.navOption }/show/?showId=${ params.showId }` );
                let trailers = await axios.get( `/tv-videos/?showId=${ params.showId }/` );
                setState( response.data.results );
                setTrailers( trailers.data.results.results );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchShows();
    }, [ params.showId, params.navOption ] );

    useEffect( () => {
        const fetchRecommendations = async () => {

            try {
                let response = await axios.get( `/show/recommendations/?showId=${ params.showId }` );
                let recommended = response.data.results.results;
                setRecommended( recommended )
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchRecommendations();
    }, [ params.showId ] );



    let airDate = null;
    let nextEpisodeDate = null;
    let regex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    //shows that have finished airing have a next_episode_to_air value set to null
    //so only the shows with a next episode will render
    if ( Object.keys( state ).length !== 0 ) {
        if ( state.next_episode_to_air !== null ) {

            let nextEpisodeAirDate = state.next_episode_to_air.air_date;
            let firstDate = state.first_air_date;

            let nextAirDate = nextEpisodeAirDate.replace( regex, '$2/$3/$1' );
            let firstAirDate = firstDate.replace( regex, '$2/$3/$1' )

            nextEpisodeDate = <p className={ styles.nextEpisodeDate }>Next Ep: { nextAirDate }</p>
            airDate = <p style={ { fontSize: '13px' } }>Air Date: { firstAirDate }</p>
        }
        else {
            let lastAirDate = state.last_episode_to_air.air_date;
            let lastAirDateRefactor = lastAirDate.replace( regex, '$2/$3/$1' );
            nextEpisodeDate = <p className={ styles.nextEpisodeDate }>Last air date: { lastAirDateRefactor }</p>
        }

    }

    return (
        <Fragment>
            <MenuOfCanvas type='shows' />
            <div className={ styles.mainContainer }>
                {
                    Object.keys( state ).length === 0 ? null
                        : <Fragment>
                            <div className={ styles.imgContainer }>
                                <img
                                    src={ `https://image.tmdb.org/t/p/w300/${ state.poster_path }` }
                                    alt='poster'
                                    style={ { height: '200px' } }
                                />

                                <div style={ { margin: 'auto' } }>
                                    <h3 style={ { textAlign: 'center' } }>{ state.name }</h3>

                                    {
                                        state.name !== state.original_name
                                            ? <h6 style={ { textAlign: 'center' } }>{ state.original_name }</h6>
                                            : null
                                    }

                                    { airDate }
                                    { nextEpisodeDate }
                                </div>

                                <div className={ styles.generalInfo }>
                                    <p>Type</p>
                                    <p>Lang</p>
                                    <p>Episodes</p>

                                    <h6 className={ styles.title }>TV</h6>
                                    <h6 className={ styles.title }>{ state.original_language.toUpperCase() }</h6>
                                    <h6 className={ styles.title }>{ state.number_of_episodes }</h6>
                                </div>
                            </div>

                            <Sypnosis overview={ state.overview } />

                            <Card bsPrefix={ styles.statsGenres }>
                                <Card.Title className={ styles.statusTitle }>Status</Card.Title>
                                <p className={ styles.movieStatus } >{ state.status }</p>

                                <Card.Title className={ styles.genresTitle }>Genres</Card.Title>
                                <ul className={ styles.genres }>


                                    {
                                        state.genres.map( genre =>
                                            <li key={ genre.id }
                                                className={ styles.genre }>
                                                { genre.name }.
                                            </li>
                                        )
                                    }
                                </ul>
                            </Card>

                            {
                                state.number_of_seasons > 1
                                    ? <div className={ styles.siteContainer }> <Seasons seasons={ state.seasons } name={ state.name } currentMediaId={params.showId}/> </div>
                                    : null
                            }


                            <div className={ styles.siteContainer }>
                                <p >Official website: </p>
                                <a href={ `${ state.homepage }` } className={ styles.siteLink }>{ state.homepage }</a>
                            </div>


                            <Card style={ { marginTop: '20px', marginBottom: '20px', backgroundColor:' rgb(180, 186, 210)' } }>
                                <Providers id={ params.showId } mediaType='show' />
                            </Card>


                            {
                                trailers.length !== 0 ? <Trailers videos={ trailers } /> : null
                            }

                            {
                                Object.keys( recommended ).length === 0
                                    ? null
                                    : <Recommendations recommendations={ recommended } mediaType='shows' />

                            }

                            {
                                /*
                                 <Card>
                                <img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                            </Card>
                                */
                            }


                        </Fragment>
                }
            </div >
        </Fragment >
    )
}

export default About;