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
import homeIcon from '../../Images/home.png';
import axios from 'axios';


const MenuOfCanvas = ( { type, getMediaByGenre } ) => {
    const [ show, setShow ] = useState( false );
    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    const [ genres, setGenres ] = useState( [] );
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


    const passMovieIdAndCloseMenu = ( genreId, genreNname ) => {
        getMediaByGenre( genreId, genreNname );
        handleClose();
    }


    const onChangeHandler = ( e ) => {
        setsearchName( e.target.value );
    }

    // const closeAfterSearch = () => {
    //      onClickHandler();
    //     handleClose();
    // }

    return (
        <>
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
                            View { linkName }
                        </NavLink>
                        <Dropdown.Divider />

                        <Dropdown>
                            <Dropdown.Toggle id='dropdown-custom-1' bsPrefix={ styles.toggleButton } style={ { backgroundColor: 'rgb(55, 58, 71)' } }
                            >Genres</Dropdown.Toggle>
                            <Dropdown.Menu className={ styles.genres }>
                                {
                                    genres.length === 0 ? null : genres.map( genre =>
                                        <Dropdown.Item key={ genre.name } onClick={ () => passMovieIdAndCloseMenu( genre.id, genre.name ) }>{ genre.name }</Dropdown.Item> )
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
                                    Button
                                </Button>
                            </NavLink>

                        </InputGroup>

                    </Dropdown.Menu>

                </Offcanvas.Body>

                <span style={ { fontSize: '11px', textAlign: 'center' } }>
                    <div>Icons made by
                        <a href='https://www.freepik.com' title='Freepik' className={ styles.iconCredit }>Freepik</a>,
                        <a href='https://www.flaticon.com/authors/icongeek26' title='Icongeek26' className={ styles.iconCredit }>Icongeek26</a>,
                        <a href='https://www.flaticon.com/authors/ctrlastudio' title='Ctrlastudio' className={ styles.iconCredit }>Ctrlastudio</a> from
                        from
                        <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
                    </div>
                </span>


            </Offcanvas>
        </>
    );
}

export default MenuOfCanvas;