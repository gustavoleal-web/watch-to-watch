import React, { useState, useEffect, Fragment } from 'react';
import Card from 'react-bootstrap/Card'
import Seasons from './Seasons';
import MenuOfCanvas from '../Header/menuOfCanvas';
import Sypnosis from '../Movies/Accordion';
import Trailers from '../Movies/Trailers'
import styles from '../Movies/css/about.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const About = () => {
    const [ state, setState ] = useState( {} );
    const [ trailers, setTrailers ] = useState( [] )
    const params = useParams();

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/${ params.navOption }/show/?showId=${ params.showId }` );
                let trailers = await axios.get( `/tv-videos/?showId=${ params.showId }/` );
                setState( response.data.results );
                setTrailers( trailers.data.results.results );

                //props to pass About component
                //last_air_date
                //last_episode_to_air
                //number_of_seasons
            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [ params.showId, params.navOption ] );


    let nextEpisodeDate = null;
    //shows that have finished airing have a next_episode_to_air value set to null
    //so only the shows with a next episode will render
    if ( Object.keys( state ).length !== 0 ) {
        if ( state.next_episode_to_air !== null ) {
            nextEpisodeDate = <p>Next Ep: { state.next_episode_to_air.air_date.replaceAll( '-', '/' ) }</p>
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


                                    <p>Air Date: { state.first_air_date.replaceAll( '-', '/' ) }</p>
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
                            <p style={ { fontSize: '11px', textAlign: 'end', fontWeight: '600', color: 'lightGray' } }>YYYY/DD/MM</p>

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
                                    ? <div className={ styles.siteContainer }> <Seasons seasons={ state.seasons } name={ state.name } /> </div>
                                    : null
                            }


                            <div className={ styles.siteContainer }>
                                <p >Official website: </p>
                                <a href={ `${ state.homepage }` } className={ styles.siteLink }>{ state.homepage }</a>
                            </div>


                            {
                                trailers.length !== 0 ? <Trailers videos={ trailers } /> : null
                            }

                            <Card>
                                <img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                            </Card>
                        </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default About;