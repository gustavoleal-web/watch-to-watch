import React, { useState, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CollectionPoster from '../Movies/CollectioPoster';
import SeasonDetails from './SeasonDetails';
import styles from '../Movies/css/collection.module.css';
import infoIcon from '../../Images/info.png';
import axios from 'axios';


const Collection = ( { seasons, name, currentMediaId } ) => {
    const [ show, setShow ] = useState( false );
    const [ seasonDetails, setSeasonDetails ] = useState( {} );

    const handleClose = () => setShow( false );
    const handleShow = () => setShow( true );



    const getSeasonDetails = async ( id, seasonNum ) => {
        try {
            let response = await axios.get( `/show/season/?showId=${ id }&seasonNum=${ seasonNum }` );
            let results = response.data.results;
            console.log(results);
            setSeasonDetails( { results } )
        }
        catch ( e ) {
            console.log( e )
        }

    }


    return (
        <>
            <span onClick={ handleShow } className={ styles.collectionName }>
                <p>
                    Seasons
                </p>
                <img src={ infoIcon } alt="" />
            </span>


            <Offcanvas show={ show } onHide={ handleClose } placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{ name }</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body bsPrefix={ styles.canvasBody }>
                    {
                        seasons.map( ( s ) =>
                            <div key={ s.id }>
                                <CollectionPoster
                                    media='tv'
                                    posterPath={ s.poster_path }
                                    title={ s.name }
                                    partId={ s.id }
                                    currentMediaId={ currentMediaId }
                                    seasonNumber={ s.season_number }
                                    getSeasonDetails={ getSeasonDetails }
                                />
                                <h6 style={ { padding: '5px 10px' } }>{ s.episode_count } Episodes </h6>
                            </div>
                        )

                    }
                    {
                        Object.keys(seasonDetails).length !== 0
                        ?  <SeasonDetails season={ seasonDetails } />
                        : null
                    }
                   
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Collection;