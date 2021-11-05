import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

const Collection = ( { name, id } ) => {
    const [ movieCollection, setMovieCollection ] = useState( {} );
    const [ show, setShow ] = useState( false );

    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    useEffect( () => {
        const fetchCollection = async () => {

            try {
                let response = await axios.get( `/collections/?collectionId=${ id }` );
                let fetchedCollection = response.data.results;
                setMovieCollection( fetchedCollection )
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchCollection();
    }, [ id ] );

    return (
        <>
            <p onClick={ handleShow }>
                { name }
            </p>
            <Offcanvas show={ show } onHide={ handleClose } placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{ name }</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        Object.keys( movieCollection ).length !== 0 && movieCollection.parts.length !== 0
                            ? movieCollection.parts.map( ( part ) => <img src={ `https://image.tmdb.org/t/p/w300${ part.poster_path }` } alt="" /> )
                            : null

                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Collection;