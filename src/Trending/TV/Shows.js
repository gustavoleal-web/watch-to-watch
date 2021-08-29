import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Show from './Show/Show';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';

const Shows = () => {
    const [ tvShows, setTvShows ] = useState( [] );
    const [ searchName, setsearchName ] = useState( '' )

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `http://localhost:3001/trending/shows` );
                setTvShows( response.data.results.results );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [] );


    const onChangeHandler = ( e ) => {
        setsearchName( e.target.value );
    }

    const onClickHandler = async () => {
        if ( searchName.length > 3 ) {
            let url = `/search/tv/?tvShow=${ searchName }`;

            try {
                let response = await axios.get( url );
                console.log( response.data.results.results );
                setTvShows( response.data.results.results );
            }
            catch ( e ) {
                console.log( e )
            }

        }

    }


    if ( tvShows.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        return (
            <div>

                <InputGroup >
                    <FormControl
                        placeholder='Search TV Shows'
                        aria-label='Search TV Shows'
                        aria-describedby="basic-addon2"
                        value={ searchName }
                        onChange={ onChangeHandler }
                    />
                    <Button variant='outline-secondary' id='button-addon2' onClick={ onClickHandler }>
                        Button
                    </Button>
                </InputGroup>

                <h2>Trending TV Shows</h2>
                {
                    tvShows.map( show =>
                        <Show id={ show.id }
                            name={ show.name }
                            airDate={ show.first_air_date }
                            posterPath={ show.poster_path }
                            backdropPath ={show.backdrop_path}
                            key={ show.id }
                        /> )
                }
            </div>
        )
    }
}

export default Shows;