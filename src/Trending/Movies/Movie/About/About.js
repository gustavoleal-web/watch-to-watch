import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Title from './Titles/Titles';
import styles from './css/about.module.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


const About = () => {
    const params = useParams();
    const [ state, setState ] = useState( {} )

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/trending/movies/?movieId=${ params.movieId }` );
                setState( response.data.results )
            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [ params.movieId ] );

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
                            <h3>{ state.original_title }</h3>
                        </div>


                        <Card bsPrefix={ styles.card }>

                            <Title name='Type' />
                            <Title name='Lang' />
                            <Title name='Produced In' />
                            <Title name='Runtime' />

                            <p className={ styles.title }>Movie</p>
                            <p className={ styles.title }> { state.original_language.toUpperCase() }</p>

                            {
                                state.production_countries.map( company =>
                                    <p key={ company.name }
                                        className={ styles.title }>
                                        { company.iso_3166_1 }
                                    </p> )
                            }
                            <p className={ styles.title }> { state.runtime } min.</p>

                        </Card>

                        <Card bsPrefix={ styles.cardOverview }>
                            <Card.Body>
                                { state.overview }
                            </Card.Body>
                        </Card>


                        <Card bsPrefix={ styles.statsGenres }>
                            <Card.Title className={ styles.statsGenresMargin }>Status</Card.Title>
                            <Card.Title>Genres</Card.Title>

                            <p className={ styles.statsGenresMargin } >{ state.status }</p>
                            <ul className={ styles.statsGenresUl }>

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

                        <Card>
                            <img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                        </Card>
                    </Fragment>
            }
        </div>
    )
}

export default About;