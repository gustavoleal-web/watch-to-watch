import React, { useState, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CollectionPoster from '../Movies/CollectioPoster';
import styles from '../Movies/css/collection.module.css';
import infoIcon from '../../Images/info.png';

const Seasons = ( { seasons, name, currentMediaId } ) => {
    const [ show, setShow ] = useState( false );
    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );
    const numberOfSeasons = seasons.length;

    return (
        <Fragment>
            <span onClick={ handleShow } className={ styles.collectionName }>
                <p>
                    Seasons
                </p>
                <img src={ infoIcon } alt='more info' className={ styles.infoIcon } />
            </span>


            <Offcanvas show={ show } onHide={ handleClose } placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{ name }</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body bsPrefix={ styles.canvasBody }>
                    {
                        seasons.map( ( s ) =>
                            <div key={ s.id }>
                                <CollectionPoster
                                    media='tv'
                                    posterPath={ s.poster_path }
                                    title={ s.name }
                                    partId={ s.id }
                                    currentMediaId={ currentMediaId }
                                    seasonNumber={ s.season_number }
                                    numberOfSeasons={ numberOfSeasons }

                                />
                                <h6 style={ { padding: '5px 10px' } }>{ s.episode_count } Episodes </h6>
                            </div>
                        )

                    }


                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
}


export default Seasons;