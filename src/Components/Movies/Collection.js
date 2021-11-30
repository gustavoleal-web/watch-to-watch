import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CollectionPoster from './CollectioPoster';
import axios from 'axios';
import styles from './css/collection.module.css';
import infoIcon from '../../Images/info.png';


const Collection = ( { name, id, movieId } ) => {
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
            <span onClick={ handleShow } className={ styles.collectionName }>
                <p>
                    { name }
                </p>
                <img src={ infoIcon } alt="" />
            </span>


            <Offcanvas show={ show } onHide={ handleClose } placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{ name }</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body bsPrefix={ styles.canvasBody }>
                    {
                        Object.keys( movieCollection ).length !== 0 && movieCollection.parts.length !== 0
                            ? movieCollection.parts.map( ( part ) =>
                                <CollectionPoster
                                    key={ part.id }
                                    posterPath={ part.poster_path }
                                    title={ part.title }
                                    partId={ part.id }
                                    movieId={ movieId }
                                    handleClose={ handleClose }
                                />

                            )
                            : null

                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Collection;