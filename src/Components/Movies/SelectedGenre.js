import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Media from '../Movies/Media';
import axios from 'axios';

const SelectedGenre = () => {
    const params = useParams();
    const [ mediaByGenre, setMediaByGenre ] = useState( [] );

    useEffect( () => {
        const fetchMediaByGenres = async () => {

            try {
                let response = await axios.get( `/${ params.type }/byGenre/?genreId=${ params.genreId }` );
                setMediaByGenre( response.data.results.results );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchMediaByGenres();
    }, [ params.type, params.genreId ] );

    if ( mediaByGenre.length > 0 ) {
        return <Fragment>
            <h1>{ params.genreOption }</h1>

            {
                mediaByGenre.map( ( g ) =>
                    <Media
                        id={ g.id }
                        title={ g.title }
                        releaseDate={ g.release_date }
                        posterPath={ g.poster_path }
                        rating={ g.vote_average }
                        option='trending'
                        type={ params.type } />
                )
            }

        </Fragment >



    }

    else return null

}

export default SelectedGenre;