import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import styles from './css/navBar.module.css';

const NavBarMenu = ( { type } ) => {
    const [ genres, setGenres ] = useState( [] );

    let navOptions = [];
    let linkTo = '';

    if ( type === 'movies' ) {
        navOptions = [ 'upcoming', 'now playing', 'top rated' ];
        linkTo = 'shows';
    }
    else if ( type === 'shows' ) {
        navOptions = [ 'lastest', 'airing today', 'top rated' ];
        linkTo = 'movies';
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


    return <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' fixed='top'>
        <Container>
            <Navbar.Brand href='#home'>What to watch</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto' navbarScroll>

                    {
                        navOptions.map( option => {
                            let optionNoSpaces = option.split( ' ' ).join( '' );

                            return (
                                <NavLink to={ `/movies/${ optionNoSpaces }` } key={ optionNoSpaces } className={ styles.navLink }>
                                    { option }
                                </NavLink> )
                        } )
                    }

                    <NavDropdown title='Genres' id='collasible-nav-dropdown'>
                        {
                            genres.length === 0 ? null : genres.map( genre => <NavDropdown.Item key={ genre.name }>
                                { genre.name }</NavDropdown.Item> )
                        }
                    </NavDropdown>

                    <NavLink
                        to={ `/${ linkTo }` }
                        className={ styles.navLink } >
                        { linkTo }
                    </NavLink>
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>
}

export default NavBarMenu;

//movies:
    //upcoming
    //now playing
    //top rated
    //genres

//TV:
    //get lastest
    //get tv airing today
    //top rated or get popular
    //genres
