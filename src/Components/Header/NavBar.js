import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const NavBarMenu = ( { type } ) => {
    const [ genres, setGenres ] = useState( [] );

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



    return <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
            <Navbar.Brand href='#home'>What to watch</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto' navbarScroll>
                    <Nav.Link href='#features'>Upcoming</Nav.Link>
                    <Nav.Link href='#features'>Now Playing</Nav.Link>
                    <Nav.Link href='#features'>Top rated</Nav.Link>
                    <NavDropdown title='Genres' id='collasible-nav-dropdown'>
                        {
                            genres.length === 0 ? null : genres.map( genre =>
                                <NavDropdown.Item href='#action/3.1' key={ genre.name }>{ genre.name }</NavDropdown.Item> )
                        }
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavBarMenu;

