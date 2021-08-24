import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import Card from 'react-bootstrap/Card';

const About = () => {
    const params = useParams();
    const [ state, setState ] = useState( {} )

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/trending/movies/?movieId=${ params.movieId }` );
                setState( response.data.results )
                console.log( response.data.results );
            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [ params.movieId ] );

    return (
        <Fragment>
            {
                Object.keys( state ).length === 0 ? null
                    : <div>
                        <img src={ `https://image.tmdb.org/t/p/w300/${ state.poster_path }` } alt='poster' style={ { height: '200px' } } />
                        <h3>{ state.original_title }</h3>
                        <Card style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 3fr 2fr', } }>

                            <p>Type</p>
                            <p>Lang</p>
                            <p>Produced In</p>
                            <p>Runtime</p>


                            <p style={ { margin: '0' } }>Movie</p>
                            {
                                <p style={ { margin: '0' } }> { state.original_language.toUpperCase() }</p>
                            }
                            {
                                state.production_countries.map( company => <p key={ company.name } style={ { margin: '0' } }>{ company.iso_3166_1 }</p> )
                            }
                            <p style={ { margin: '0' } }> { state.runtime } min.</p>

                        </Card>

                        <p>{ state.overview }</p>

                        <Card style={ { display: 'grid', gridTemplateColumns: '1fr 1fr' } }>
                            <Card.Title style={ { marginLeft: '10px' } }>Status</Card.Title>
                            <Card.Title>Genres</Card.Title>

                            <p style={ { marginLeft: '10px' } }>{ state.status }</p>
                            <ul style={ { listStyle: 'none', display: 'flex', flexWrap: 'wrap', paddingLeft: '0' } }>

                                {
                                    state.genres.map( genre => <li key={ genre.id } style={ { marginRight: '10px' } }>{ genre.name }.</li> )
                                }
                            </ul>
                        </Card>

                        <Card>
                            <img src={ `https://image.tmdb.org/t/p/w300/${ state.backdrop_path }` } alt='poster' />

                        </Card>
                    </div>
            }
        </Fragment>
    )
}

export default About;