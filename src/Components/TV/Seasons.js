import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CollectionPoster from '../Movies/CollectioPoster';
import styles from '../Movies/css/collection.module.css';
import infoIcon from '../../Images/info.png';


const Collection = ( { seasons, name } ) => {
    const [ show, setShow ] = useState( false );

    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    return (
        <>
            <span onClick={ handleShow } className={ styles.collectionName }>
                <p>
                   Seasons
                </p>
                <img src={ infoIcon } alt="" />
            </span>


            <Offcanvas show={ show } onHide={ handleClose } placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{name}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body bsPrefix={ styles.canvasBody }>
                    {
                        seasons.map( ( s ) => <CollectionPoster
                            posterPath={ s.poster_path }
                            title={ s.name }
                            key={ s.id } /> )

                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Collection;