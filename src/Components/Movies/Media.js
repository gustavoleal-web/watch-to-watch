import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import styles from './css/media.module.css';
import noImage from '../../Images/No-Image-Placeholder.png';


const Media = ( { id, title, releaseDate, posterPath, rating, option, type, overview } ) => {
    const [ show, setShow ] = useState( false );

    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    //since SearchedMedia component is using the movie component to render searched tv shows
    //when the use clicks on the show it will return the movie with the matching id not 
    //clicked tv show. 
    //solution are to pass a prop to determine the type or to make show and movie into a single component
    let linkPath = `/${ type }/${ option }/${ id }`;


    let posterImg = null;
    if ( posterPath === null ) {
        posterImg = <img src={ `${ noImage }` } alt='poster' style={ { height: '100%' } } />

    }

    else {
        posterImg = <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '100%' } } />
    }


    let mmddyyyy
    //converts yyyy-mm-dd to mm/dd/yyyy
    if ( releaseDate !== undefined ) {
        let regex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
        let str = releaseDate;
        mmddyyyy = str.replace( regex, '$2/$3/$1' );
    }

    else {
        mmddyyyy = null;
    }

    let synopsis = overview.length === 0 ? 'No synopsis available at this time' : overview;


    return (

        <div className={ styles.mediaContainer }>

            <div className={ styles.mediaDisplay }>
                <NavLink style={ { textDecoration: 'none' } } to={ linkPath }>
                    { posterImg }
                </NavLink>

                <div className={ styles.mediaMain }>
                    <h6>{ title }</h6>
                    <p>{ mmddyyyy }</p>

                    <p className={ styles.overview } onClick={ handleShow } >{ synopsis.slice( 0, 100 ) }... </p>

                    <Modal size="lg" centered show={ show } onHide={ handleClose }>
                        <Modal.Header closeButton>
                            <Modal.Title >
                                { title }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <p className={ styles.modalOverview }>{ synopsis }</p>
                        </Modal.Body>
                    </Modal>



                    <p className={ styles.rating }>{ rating }</p>
                </div>

            </div>

        </div >
    )
}


export default Media;