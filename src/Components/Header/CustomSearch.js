import React, { useState, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

const CustomSearch = ( { genres, langs } ) => {
    const [ selectedLang, setSelectedLan ] = useState( 'en' );


    return <Fragment>
        <Accordion>
            <h5>Custom Search</h5>
            <Accordion.Item eventKey="0" flush='true'>
                <Accordion.Header>Year</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group controlId="formGridCity">
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

            <Accordion.Item eventKey="1">
                <Accordion.Header>Date Range</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <Form.Group controlId="formGridState">
                            <Form.Label>From</Form.Label>
                            <input type='date' />
                        </Form.Group>

                        <Form.Group controlId="formGridZip">
                            <Form.Label>To</Form.Label>
                            <input type='date' />
                        </Form.Group>
                    </div>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Lang and Rating</Accordion.Header>
                <Accordion.Body>

                    <Form.Group controlId="formGridState">
                        <Form.Select size='sm' defaultValue={ selectedLang } onChange={ ( e ) => setSelectedLan( e.target.value ) }>
                            {
                                langs.map( lang => <option value={ lang.iso_639_1 } key={ lang.iso_639_1 }>{ lang.english_name }</option> )
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formGridZip">
                        <Form.Select size='sm'>
                            {
                                Array.from( { length: 10 }, ( _, i ) => 10 - i )
                                    .map( rating => <option value={ rating } key={ rating }>{ rating }</option> )
                            }
                        </Form.Select>
                    </Form.Group>

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>Genre</Accordion.Header>

                <Accordion.Body>
                    <Form.Group controlId="formGridZip">
                        <Form.Select size='sm'>
                            {
                                genres.map( genre => <option value={ genre.name } key={ genre.name }>{ genre.name }</option> )
                            }

                        </Form.Select>
                    </Form.Group>
                </Accordion.Body>

            </Accordion.Item>
        </Accordion>

    </Fragment>
}

export default CustomSearch;