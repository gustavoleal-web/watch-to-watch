import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Providers from './Providers';
import Title from './Titles';
//import NavBarMenu from '../Header/NavBar';
import MenuOfCanvas from '../Header/menuOfCanvas';
import styles from './css/about.module.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import OfCanvas from '../TV/OfCanvas'

import Carousel from './Carousel';
import Sypnosis from './Accordion';


const About = () => {
    const params = useParams();
    const [ state, setState ] = useState( {} );
    const [ recommended, setRecommended ] = useState( [] );

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.navOption }/movie/?movieId=${ params.movieId }` );
                setState( response.data.results )
            }
            catch ( e ) {
                console.log( e )
            }
        }

        fetchShows();
    }, [ params.movieId, params.navOption ] );

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/movie/recommendations/?movieId=${ params.movieId }` );
                let recommended = response.data.results.results.slice( 9 );
                setRecommended( recommended )
            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [ params.movieId ] );

    return (
        <Fragment>
            <MenuOfCanvas type='movies' />
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
                                <h3 className={ styles.MovieTitle }>{ state.title }</h3>
                            </div>

                            <Card bsPrefix={ styles.card }>

                                <Title name='Type' />
                                <Title name='Lang' />
                                <Title name='Produced In' />
                                <Title name='Runtime' />

                                <p className={ styles.title }>Movie</p>
                                <p className={ styles.title }> { state.original_language }</p>

                                <ul className={ styles.productionCountries }>
                                    {
                                        state.production_countries.map( company =>
                                            <li key={ company.name }
                                                className={ styles.title }>
                                                { company.iso_3166_1 }
                                            </li> )
                                    }
                                </ul>

                                <p className={ styles.title }> { state.runtime } min.</p>

                            </Card>

                            <Sypnosis overview={ state.overview } />

                            {
                                // <Card bsPrefix={ styles.cardOverview }>
                                // <OfCanvas overview={ state.overview } />
                                //</Card>
                            }



                            <Card bsPrefix={ styles.statsGenres }>
                                <Card.Title className={ styles.statsGenresMargin }>Status</Card.Title>
                                <Card.Title style={ { paddingLeft: '32px' } }>Genres</Card.Title>

                                <p className={ styles.statsGenresMargin } >{ state.status }</p>
                                <ul className={ styles.statsGenresUl }>

                                    {
                                        state.genres.map( genre =>
                                            <li key={ genre.id }
                                                className={ styles.genre }>
                                                { genre.name }
                                            </li>
                                        )
                                    }
                                </ul>
                            </Card>

                            <Card style={ { marginTop: '20px', marginBottom: '20px' } }>
                                <Providers movieId={ params.movieId } />
                            </Card>

                            {
                                //https://api.themoviedb.org/3/movie/movieId/videos?api_key={key}&language=en-US&include_image_language=US
                                //BdJKm16Co6M would be the id in the iframe
                            }
                            <iframe
                                width="400"
                                height="315"
                                src="https://www.youtube.com/embed/BdJKm16Co6M"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >
                            </iframe>

                            {
                                //<img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                            }

                            {
                                Object.keys( recommended ).length === 0
                                    ? null
                                    : <Carousel recommendations={ recommended } />

                            }
                        </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default About;