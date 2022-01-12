import React from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

const CustomSearch = () => {
    return <div>
    
    {/* these will have to be looped */ }
    <Accordion>
    <h5>Custom Search</h5>
        <Accordion.Item eventKey="0" flush>
            <Accordion.Header>Year</Accordion.Header>
            <Accordion.Body>
                <Form>
                    <Form.Group controlId="formGridCity">
                        <Form.Select size='sm'>
                            <option>Open this select menu</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
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
                    <Form.Select size='sm'>
                        <option value="ENG" default>ENG</option>
                        <option value="SPA">SPA</option>
                        <option value="JAP">JAP</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formGridZip">
                    <Form.Select size='sm'>
                        <option>Rating</option>
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                    </Form.Select>
                </Form.Group>

            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
            <Accordion.Header>Genre</Accordion.Header>

            <Accordion.Body>
                <Form.Group controlId="formGridZip">
                    <Form.Select size='sm'>
                        <option value="Action">Action</option>
                        <option value="Advanture">Advanture</option>
                        <option value="Horror">Horror</option>
                    </Form.Select>
                </Form.Group>
            </Accordion.Body>

        </Accordion.Item>


    </Accordion>
    
    </div>
}

export default CustomSearch;