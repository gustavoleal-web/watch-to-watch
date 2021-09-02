import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import styles from './about.module.css';
import OffCanvasExample from './OfCanvas';

const About = () => {
    const [ state, setState ] = useState( {} )
    const params = useParams();

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/trending/show/?showId=${ params.showId }` );
                setState( response.data.results );

                //props to pass About component
                //genres
                //first_air_date
                //last_air_date
                //last_episode_to_air
                //next_episode_to_air (if any)
                //number_of_episodes
                //number_of_seasons
                //seasons
                //overview
            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [ params.showId ] );

    return (
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
                                <h1 style={ { textAlign: 'center' } }>{ state.original_name }</h1>
                                <p>Air Date: { state.first_air_date.replaceAll( '-', '/' ) }</p>
                                <p>Next Ep: { state.next_episode_to_air.air_date.replaceAll( '-', '/' ) }</p>
                            </div>


                        </div>
                        <p style={ { fontSize: '11px', textAlign: 'end', fontWeight: '600', color: 'lightGray' } }>YYYY/DD/MM</p>


                        <Card bsPrefix={ styles.card }>
                            <p>Type</p>
                            <p>Lang</p>
                            <p>Episodes</p>
                            <p>Run time</p>


                            <h6>TV</h6>
                            <h6>{ state.original_language.toUpperCase() }</h6>
                            <h6>{ state.number_of_episodes }</h6>
                            <h6>{ state.episode_run_time[ 0 ] } min</h6>

                        </Card>

                        <Card bsPrefix={ styles.cardOverview }>
                            <Card.Body>
                                { state.overview }
                            </Card.Body>
                        </Card>


                        <Card bsPrefix={ styles.statsGenres }>
                            <Card.Title className={ styles.statsGenresMargin }>Status</Card.Title>
                            <Card.Title>Genres</Card.Title>

                            <p>{ state.status }</p>
                            <ul className={ styles.statsGenresUl }>

                                {
                                    state.genres.map( genre =>
                                        <li key={ genre.id }>
                                            { genre.name }.
                                        </li>
                                    )
                                }
                            </ul>
                        </Card>


                        <Card>
                            { state.seasons.map( season =>
                                <Fragment key={ season.season_number }>
                                    <img src={ `https://image.tmdb.org/t/p/w300${ season.poster_path }` } alt='poster' style={ { height: '200px', width: '135px' } } />
                                    <p>{ season.name }</p>
                                    <p>{ season.episode_count }</p>
                                    <OffCanvasExample overview={ season.overview } />
                                </Fragment>
                            ) }

                        </Card>

                        <Card>
                            <img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                        </Card>
                    </Fragment>
            }
        </div>
    )
}

export default About;