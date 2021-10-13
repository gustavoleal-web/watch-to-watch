import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styles from './css/accordion.module.css';

const Sypnosis = ( { overview } ) => {
    return <div className={styles.container}>
        <Accordion flush bsPrefix={ styles.main }>
            <Accordion.Item eventKey="0" bsPrefix={ styles.item }>
                <Accordion.Header bsPrefix={ styles.header }>Sypnosis</Accordion.Header>
                <Accordion.Body >
                    { overview }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    </div>


}

export default Sypnosis