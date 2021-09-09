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
                console.log( results )
                //setGenres( results )
            }
            catch ( e ) {
                console.log( e )
            }


        }
        fetchShows();
    }, [] );



    return <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
            <Navbar.Brand href='#home'>What to watch</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto' navbarScroll>
                    <Nav.Link href='#features'>Item 1</Nav.Link>
                    <Nav.Link href='#features'>Item 2</Nav.Link>
                    <NavDropdown title='Movies' id='collasible-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>Upcoming</NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.2'>Now Playing</NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.3'>Top Rated</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavBarMenu;

