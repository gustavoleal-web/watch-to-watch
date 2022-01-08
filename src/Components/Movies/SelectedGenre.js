import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Media from '../Movies/Media';
import MenuOfCanvas from '../Header/menuOfCanvas';
import axios from 'axios';

const SelectedGenre = () => {
    const params = useParams();
    const [ mediaByGenre, setMediaByGenre ] = useState( [] );

    useEffect( () => {
        const fetchMediaByGenres = async () => {

            try {
                let response = await axios.get( `/${ params.type }/byGenre/?genreId=${ params.genreId }` );

                let responseCopy = [ ...response.data.results.results ];

                    //adding the same key found in movies so it matches with shows 
                    //prevents the props from being undefined in the key name is different
                    if ( responseCopy.length > 0 ) {
                        for ( let i = 0; i < responseCopy.length; i++ ) {
                            if ( responseCopy[ i ].name ) {
                                responseCopy[ i ].title = responseCopy[ i ].name;
                                responseCopy[ i ].original_title = responseCopy[ i ].original_name;
                            }
                            if ( responseCopy[ i ].first_air_date ) {
                                responseCopy[ i ].release_date = responseCopy[ i ].first_air_date;
                            }

                        }
                    }


                setMediaByGenre(responseCopy );
               
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchMediaByGenres();
    }, [ params.type, params.genreId ] );

    if ( mediaByGenre.length > 0 ) {
        return <Fragment>
            <MenuOfCanvas type={ params.type } />
            
            <h1>{ params.genreOption }</h1>

            {
                mediaByGenre.map( ( g ) =>
                    <Media
                        key={ g.id }
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