import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Providers from './Providers';
import Title from './Titles';
//import NavBarMenu from '../Header/NavBar';
import MenuOfCanvas from '../Header/menuOfCanvas';
import styles from './css/about.module.css';
import startIcon from '../../Images/star.png'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
// import OfCanvas from '../TV/OfCanvas'

import Recommendations from './Recommendations';
import Sypnosis from './Accordion';



const About = () => {
    const params = useParams();
    const [ state, setState ] = useState( {} );
    const [ trailers, setTrailers ] = useState( [] )
    const [ recommended, setRecommended ] = useState( [] );

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.navOption }/movie/?movieId=${ params.movieId }` );
                let trailers = await axios.get( `/videos/?movieId=${ params.movieId }/` ); 
                setState( response.data.results );
                setTrailers( trailers.data.results.results );
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
                                <div>
                                    <img
                                        className={ styles.posterImg }
                                        src={ `https://image.tmdb.org/t/p/w300/${ state.poster_path }` }
                                        alt='poster'

                                    />
                                    <p className={ styles.rating }>{ state.vote_average } <img src={ startIcon } alt='stars' /></p>
                                </div>

                                <h3 className={ styles.MovieTitle }>{ state.title }</h3>

                                <div className={ styles.generalInfo }>

                                    <Title name='Type' />
                                    <Title name='Lang' />
                                    {//<Title name='Produced In' />
                                    }
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

                            <div className={ styles.siteContainer }>
                                <p >Official website: </p>
                                <a href={ state.homepage } className={ styles.siteLink }>{ state.homepage }</a>
                            </div>

                            <Card style={ { marginTop: '20px', marginBottom: '20px' } }>
                                <Providers movieId={ params.movieId } />
                            </Card>

                            {
                                //https://api.themoviedb.org/3/movie/movieId/videos?api_key={key}&language=en-US&include_image_language=US
                                //BdJKm16Co6M would be the id in the iframe
                            }
                            {
                                // <iframe
                                //     width="300"
                                //     height="215"
                                //     src="https://www.youtube.com/embed/aSHs224Dge0"
                                //     title="YouTube video player"
                                //     frameBorder="0"
                                //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                //     allowFullScreen>
                                // </iframe>
                            }



                            {
                                //<img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />
                            }

                            {
                                Object.keys( recommended ).length === 0
                                    ? null
                                    : <Recommendations recommendations={ recommended } />

                            }
                        </Fragment>
                }
            </div >
        </Fragment >
    )
}

export default About;