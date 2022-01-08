import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SelectedGenre = () => {
    const params = useParams();
    const [ mediaByGenre, setMediaByGenre ] = useState( [] );

    useEffect( () => {
        const fetchMediaByGenres = async () => {

            try {
                let response = await axios.get( `/${ params.type }/byGenre/?genreId=${ params.genreId }` );

                console.log( response.data.results.results );
                //setGenres( results );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchMediaByGenres();
    }, [ params.type, params.genreId ] );



    console.log( params )
    return <div>{ params.genreOption }</div>
}

export default SelectedGenre;