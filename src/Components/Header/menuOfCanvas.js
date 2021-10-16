import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavOptions from './NavOptions';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import styles from './css/menu.module.css'
import menu from '../../Images/menu.png';
import axios from 'axios';


const MenuOfCanvas = ( { type, onClickHandler, onChangeHandler, searchName } ) => {
    const [ show, setShow ] = useState( false );
    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    const [ genres, setGenres ] = useState( [] );

    let linkTo = '';

    if ( type === 'movies' ) {
        linkTo = 'shows';
    }
    else if ( type === 'shows' ) {
        linkTo = 'movies/trending';
    }

    useEffect( () => {
        const fetchShows = async () => {

            try {
                let response = await axios.get( `/${ type }/genres` );
                let results = response.data.results.genres;
                setGenres( results );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchShows();
    }, [ type ] );

 
    return (
        <>
            <span className={ styles.menuContainer }>
                <button >
                    <img src={ `${ menu }` } alt="" onClick={ handleShow } />
                </button>
                <h1>What to watch</h1>
            </span>

            <Offcanvas show={ show } onHide={ handleClose } placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{ type.toUpperCase() }</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Dropdown.Menu show style={ { width: '90%', border: 'none' } }>
                        <NavOptions type={ type } handleClose={ handleClose } />
                        <Dropdown.Divider />

                        <NavLink
                            to={ `/${ linkTo }` }
                            className={ styles.navLink }>
                            View { linkTo }
                        </NavLink>
                        <Dropdown.Divider />

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-custom-1" bsPrefix={ styles.toggleButton }>Genres</Dropdown.Toggle>
                            <Dropdown.Menu className={ styles.genres }>
                                {
                                    genres.length === 0 ? null : genres.map( genre =>
                                        <Dropdown.Item href='#action/3.1' key={ genre.name }>{ genre.name }</Dropdown.Item> )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown.Divider />

                        <InputGroup>
                            <FormControl
                                placeholder={ `Search ${ type }` }
                                aria-label={ `Search ${ type }` }
                                aria-describedby="basic-addon2"
                                value={ searchName }
                                onChange={ onChangeHandler }
                            />
                            <Button variant='outline-secondary' id='button-addon2' onClick={ onClickHandler }>
                                Button
                            </Button>
                        </InputGroup>

                    </Dropdown.Menu>

                </Offcanvas.Body>

                <div>Icons made by
                    <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
                    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div>

                <div>Icons made by
                    <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from
                    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div>

                <div>Icons made by
                    <a href="https://www.flaticon.com/authors/ctrlastudio" title="Ctrlastudio">Ctrlastudio</a> from
                    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div>

            </Offcanvas>
        </>
    );
}

export default MenuOfCanvas;