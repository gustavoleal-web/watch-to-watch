import React, { useState, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import styles from './css/menu.module.css'

const CustomSearch = ( { genres, langs, type } ) => {
    //search path will be something like 
    //https://api.themoviedb.org/3/discover/movie?api_key=xxxxx&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2021&with_genres=18&with_original_language=en&vote_average.gte=7

    const [ selectedLang, setSelectedLan ] = useState( 'en' );

    return <Fragment>
        <div style={ { margin: '30px 10px' } }>
            <h6>Search { type } by year</h6>
            <Accordion>

                <Accordion.Item eventKey='0' flush='true'>
                    <Accordion.Header>Year</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group controlId='formGridCity'>
                                <Form.Select size='sm'>
                                    {
                                        Array.from( { length: 123 }, ( _, i ) => 2022 - i )
                                            .map( year => <option value={ year } key={ year }>{ year }</option> )

                                    }
                                </Form.Select>
                            </Form.Group>
                        </Form>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

        <div style={ { margin: '30px 10px' } }>
            <h6>Search more specific { type }</h6>
            <Accordion>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Date Range</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <Form.Group controlId='formGridState'>
                                <Form.Label>From</Form.Label>
                                <input type='date' />
                            </Form.Group>

                            <Form.Group controlId='formGridZip'>
                                <Form.Label>To</Form.Label>
                                <input type='date' />
                            </Form.Group>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='2'>
                    <Accordion.Header>Lang and Rating</Accordion.Header>
                    <Accordion.Body>

                        <Form.Group controlId='formGridState'>
                            <Form.Select size='sm' defaultValue={ selectedLang } onChange={ ( e ) => setSelectedLan( e.target.value ) }>
                                {
                                    langs.map( lang => <option value={ lang.iso_639_1 } key={ lang.iso_639_1 }>{ lang.english_name }</option> )
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='formGridZip'>
                            <Form.Select size='sm'>
                                {
                                    Array.from( { length: 10 }, ( _, i ) => 10 - i )
                                        .map( rating => <option value={ rating } key={ rating }>{ rating }</option> )
                                }
                            </Form.Select>
                        </Form.Group>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey='3'>
                    <Accordion.Header>Genre</Accordion.Header>

                    <Accordion.Body>
                        <Form.Group controlId='formGridZip'>
                            <Form.Select size='sm'>
                                {
                                    genres.map( genre => <option value={ genre.id } key={ genre.name }>{ genre.name }</option> )
                                }

                            </Form.Select>
                        </Form.Group>
                    </Accordion.Body>

                </Accordion.Item>
            </Accordion>
        </div>

        <span style={ { fontSize: '11px', textAlign: 'center' } }>
            <div>Icons made by
                <a href='https://www.freepik.com' title='Freepik' className={ styles.iconCredit }>Freepik</a>,
                <a href='https://www.flaticon.com/authors/icongeek26' title='Icongeek26' className={ styles.iconCredit }>Icongeek26</a>,
                <a href='https://www.flaticon.com/authors/ctrlastudio' title='Ctrlastudio' className={ styles.iconCredit }>Ctrlastudio</a> from
                from
                <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
            </div>
        </span>
    </Fragment >
}

export default CustomSearch;