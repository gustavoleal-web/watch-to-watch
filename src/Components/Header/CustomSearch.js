import React, { useState, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import styles from './css/menu.module.css'

const CustomSearch = ( { genres, langs, type } ) => {
    //will need 3 ways to search for these options
    //1. just the year with default lang set to english_name. no genre or rating
    //2. year with rating, lang, and genre. (genre can be null)
    //3. from to date, rating, lang, and genre

    const date = new Date();
    const year = date.getFullYear();

    const [ selectOptions, setSelectOptions ] = useState( {
        language: 'en',
        genreID: -1,
        rating: -1,
        year: year,
        dateRange: { from: '', to: '' }
    } );

    const setOptions = ( e, key, range = null ) => {
        //bc dateRange is an obj inside state an arg is passed to only change that property and not the others.
        if ( key === 'dateRange' && range !== null ) {
            //if any property of dateRange is already set we make sure to copy it so it is not lost when the state is set.
            let dateRangeCopy = { ...selectOptions.dateRange };
            dateRangeCopy[ range ] = e.target.value;

            if ( range === 'from' ) {
                dateRangeCopy.to = selectOptions[ key ].to;
            }
            else if ( range === 'to' ) {
                dateRangeCopy.from = selectOptions[ key ].from;
            }
            setSelectOptions( { ...selectOptions, [ key ]: dateRangeCopy } );
        }
        else {
            setSelectOptions( { ...selectOptions, [ key ]: e.target.value } )
        }

    };


    return <Fragment>
        {/*year*/ }

        <div style={ { margin: '30px 10px' } }>
            <h6>Search { type } by year</h6>
            <Accordion>
                <Accordion.Item eventKey='0' flush='true'>
                    <Accordion.Header>Year</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group controlId='formGridCity'>
                                <Form.Select size='sm' defaultValue={ selectOptions.year } onChange={ ( e ) => setOptions( e, 'year' ) }>
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

        {/*date range*/ }
        <div style={ { margin: '30px 10px' } }>
            <h6>Search more specific { type }</h6>
            <Accordion>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Date Range</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <Form.Group controlId='formGridState'>
                                <Form.Label>From</Form.Label>
                                <input type='date' onChange={ ( e ) => setOptions( e, 'dateRange', 'from' ) } />
                            </Form.Group>

                            <Form.Group controlId='formGridZip'>
                                <Form.Label>To</Form.Label>
                                <input type='date' onChange={ ( e ) => setOptions( e, 'dateRange', 'to' ) } />
                            </Form.Group>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

        <div style={ { margin: '30px 10px' } }>
            <Accordion>
                <Accordion.Item eventKey='2'>
                    <Accordion.Header>Lang and Rating</Accordion.Header>
                    <Accordion.Body>

                        {/*language*/ }
                        <Form.Group controlId='formGridState' style={ { marginBottom: '15px' } }>
                            <Form.Select size='sm' defaultValue={ selectOptions.language } onChange={ ( e ) => setOptions( e, 'language' ) }>
                                {
                                    langs.map( lang => <option value={ lang.iso_639_1 } key={ lang.iso_639_1 }>{ lang.english_name }</option> )
                                }
                            </Form.Select>
                        </Form.Group>

                        {/*rating*/ }
                        <Form.Group controlId='formGridZip'>
                            <Form.Select size='sm' defaultValue={ selectOptions.rating } onChange={ ( e ) => setOptions( e, 'rating' ) }>
                                <option defaultValue={ -1 }>Select a rating</option>
                                {
                                    Array.from( { length: 10 }, ( _, i ) => 10 - i )
                                        .map( rating => <option value={ rating } key={ rating }>{ rating }</option> )
                                }
                            </Form.Select>
                        </Form.Group>

                    </Accordion.Body>
                </Accordion.Item>

                {/*genre*/ }
                <Accordion.Item eventKey='3'>
                    <Accordion.Header>Genre</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group controlId='formGridZip'>
                            <Form.Select size='sm' defaultValue={ selectOptions.genreID } onChange={ ( e ) => setOptions( e, 'genreID' ) }>
                                <option defaultValue={ -1 }>Select a genre</option>
                                {
                                    genres.map( genre => <option value={ genre.id } key={ genre.name }>{ genre.name }</option> )
                                }

                            </Form.Select>
                        </Form.Group>
                    </Accordion.Body>

                </Accordion.Item>
            </Accordion>

        </div>

        <NavLink to={ `/${ type }/year/${ selectOptions.year }/language/${ selectOptions.language }` }>
            <Button>Search</Button>
        </NavLink>

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