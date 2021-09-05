import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas';

const OffCanvasExample = ( { overview } ) => {
    const [ show, setShow ] = useState( false );
    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );

    let synopsis = overview.length === 0 ? 'No synopsis' : overview;

    return (
        <>
            <Button variant='outline-dark' onClick={ handleShow } style={ { height: '30px', width: '100%', padding: '0' } }>
                Synopsis
            </Button>

            <Offcanvas show={ show } onHide={ handleClose } placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Synopsis</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    { synopsis }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasExample
