import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const CustomSearchResults = () => {
    const params = useParams();
    console.log( params );

    useEffect( () => {
        const fetchSearchOptions = async () => {
            try {
                const response = await axios.get( `/${ params.type }/releaseYear/language/?year=${ params.releaseYear }&originalLang=${ params.language }` );
                let results = response.data.results;
                console.log( results );
            }

            catch ( error ) {
                console.log( error )
            }
        }
        fetchSearchOptions();
    }, [ params.type, params.releaseYear, params.language ] )

    return <Fragment>
    <h5>Custom Search Results</h5>
    </Fragment>
}

export default CustomSearchResults;