import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Providers from './Providers';
import Title from './Titles';
import MenuOfCanvas from '../Header/menuOfCanvas';
import Card from 'react-bootstrap/Card';
import Collection from './Collection';
import styles from './css/about.module.css';
import startIcon from '../../Images/star.png'
import axios from 'axios';

import Recommendations from './Recommendations';
import Sypnosis from './Accordion';
import Trailers from './Trailers';

const About = () => {
    const params = useParams();
    const [ state, setState ] = useState( {} );
    const [ trailers, setTrailers ] = useState( [] )
    const [ recommended, setRecommended ] = useState( [] );
    const [ defaultImg, setDefaultImg ] = useState( '' );

    useEffect( () => {
        const fetchMovies = async () => {
            try {

                let response = await axios.get( `/${ params.navOption }/movie/?movieId=${ params.movieId }` );
                let trailers = await axios.get( `/videos/?movieId=${ params.movieId }/` );
                setState( response.data.results );
                setDefaultImg( `https://image.tmdb.org/t/p/w300${ response.data.results.poster_path }` );
                setTrailers( trailers.data.results.results );


            }
            catch ( e ) {
                console.log( e )
            }
            window.scrollTo( 0, 0 )
        }

        fetchMovies();

    }, [ params.movieId, params.navOption ] );

    useEffect( () => {
        const fetchRecommendations = async () => {

            try {
                let response = await axios.get( `/movie/recommendations/?movieId=${ params.movieId }` );
                let recommended = response.data.results.results;
                setRecommended( recommended );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchRecommendations();
    }, [ params.movieId ] );

    
 

    return (
        <Fragment>
            <MenuOfCanvas type='movies' />

            <div className={ styles.mainContainer }>
                {
                    Object.keys( state ).length === 0 ? null
                        : <Fragment>
                            <div className={ styles.imgContainer }>
                                <div>
                                    <img
                                        className={ styles.posterImg }
                                        src={ defaultImg }
                                        alt='poster'
                                    />
                                    <p className={ styles.rating }>{ state.vote_average } <img src={ startIcon } alt='stars' /></p>
                                </div>

                                <h3 className={ styles.movieTitle }>{ state.title }</h3>

                                <div className={ styles.generalInfo }>

                                    <Title name='Type' />
                                    <Title name='Lang' />
                                    <Title name='Runtime' />

                                    <h6 className={ styles.title }>Movie</h6>
                                    <h6 className={ styles.title }> { state.original_language }</h6>
                                    <h6 className={ styles.title }> { state.runtime } min.</h6>

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
                                                { genre.name }
                                            </li>
                                        )
                                    }
                                </ul>
                            </Card>


                            {
                                state.belongs_to_collection === null
                                    ? null
                                    : <div className={ styles.siteContainer }>
                                        <Collection name={ state.belongs_to_collection.name } id={ state.belongs_to_collection.id } currentMediaId={ params.movieId } />
                                    </div>
                            }

                            <div className={ styles.siteContainer }>
                                <p >Official website: </p>
                                <a href={ `${ state.homepage }` } className={ styles.siteLink }>{ state.homepage }</a>
                            </div>

                            <Card style={ { marginTop: '20px', marginBottom: '20px' } }>
                                <Providers id={ params.movieId } mediaType='movie' />
                            </Card>

                            {
                                trailers.length !== 0 ? <Trailers videos={ trailers } /> : null
                            }

                            {
                                //<img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                            }

                            {
                                Object.keys( recommended ).length === 0
                                    ? null
                                    : <Recommendations recommendations={ recommended } mediaType='movies' />

                            }
                        </Fragment>
                }
            </div >
        </Fragment >
    )
}

export default About;