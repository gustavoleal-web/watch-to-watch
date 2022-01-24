import React, { useState, useEffect, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavOptions from './NavOptions';
import CustomSearch from './CustomSearch';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
//import Form from 'react-bootstrap/Form';
//import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
//import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from 'react-router-dom';
import styles from './css/menu.module.css'
import menu from '../../Images/menu.png';
import homeIcon from '../../Images/home.png';
import axios from 'axios';


const MenuOfCanvas = ( { type } ) => {
    const [ show, setShow ] = useState( false );
    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    const [ genres, setGenres ] = useState( [] );
    const [ languages, setLanguages ] = useState( [] );
    const [ searchName, setsearchName ] = useState( '' );

    let linkTo = '';
    let linkName = '';

    if ( type === 'movies' ) {
        linkTo = 'shows/trending';
        linkName = 'Trending Shows';
    }
    else if ( type === 'shows' ) {
        linkTo = 'movies/trending';
        linkName = 'Trending Movies';
    }

    useEffect( () => {
        const fetchGenres = async () => {

            try {
                let response = await axios.get( `/${ type }/genres` );
                let results = response.data.results.genres;
                setGenres( results );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchGenres();
    }, [ type ] );

    useEffect( () => {
        const fetchLang = async () => {

            try {
                let fetchedLanguage = await axios.get( `/languages` );
                let results = fetchedLanguage.data.results;

                //sorting languages alphabetically
                if ( results.length > 0 ) {
                    results.sort( ( a, b ) => {
                        let nameA = a.english_name.toLowerCase(), nameB = b.english_name.toLowerCase();
                        if ( nameA < nameB )
                            return -1;
                        if ( nameA > nameB )
                            return 1;
                        return 0;
                    } );
                }
                setLanguages( results );
            }
            catch ( e ) {
                console.log( e )
            }
        }
        fetchLang();
    }, [] );

    const onChangeHandler = ( e ) => {
        setsearchName( e.target.value );
    }

    return (
        <Fragment>
            <span className={ styles.menuContainer }>
                <button >
                    <img src={ `${ menu }` } alt='What to watch' onClick={ handleShow } />
                </button>
                <h1>What to watch</h1>

                <NavLink
                    to={ `/${ type }/trending` }
                    className={ styles.navLink }>
                    <img src={ `${ homeIcon }` } alt='home button' />
                </NavLink>

            </span>
            {/* have to make the height dynamic based on screen size
                maybe 800px for mobile and 100% for desktop
            */ }
            <Offcanvas show={ show } onHide={ handleClose } placement='start' style={ { maxHeight: '800px', overflowY: 'auto' } }>
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
                            View { linkName }
                        </NavLink>
                        <Dropdown.Divider />

                        <Dropdown>
                            <Dropdown.Toggle
                                id='dropdown-custom-1'
                                bsPrefix={ styles.toggleButton }
                                style={ { backgroundColor: 'rgb(55, 58, 71)' } }
                            >Genres
                            </Dropdown.Toggle>
                            <Dropdown.Menu bsPrefix={ styles.genres }>
                                {
                                    genres.length === 0 ? null : genres.map( genre =>
                                        <NavLink to={ `/${ type }/genre/${ genre.name }/${ genre.id }` }
                                            className={ styles.genreLink }
                                            id={ genre.id }
                                            key={ genre.id }
                                            onClick={ () => handleClose() }
                                        >
                                            { genre.name }
                                        </NavLink >
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown.Divider />

                        <InputGroup>
                            <FormControl
                                placeholder={ `Search ${ type }` }
                                aria-label={ `Search ${ type }` }
                                aria-describedby='basic-addon2'
                                value={ searchName }
                                onChange={ onChangeHandler }
                            />

                            <NavLink to={ `/${ type }/search/${ searchName }` }>
                                <Button variant='outline-secondary' id='button-addon2' >
                                    Search
                                </Button>
                            </NavLink>

                        </InputGroup>

                        <Dropdown.Divider />

                        <CustomSearch genres={ genres } langs={ languages } type={ type } />
                    </Dropdown.Menu>

                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
}

export default MenuOfCanvas;