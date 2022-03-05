import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import MenuOfCanvas from '../Header/menuOfCanvas';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';
import noImage from '../../Images/No-Image-Placeholder.png'
import Form from 'react-bootstrap/Form'

const SeasonDetails = () => {
    const [ seasonDetails, setSeasonDetails ] = useState( {} )
    const params = useParams();
    const [ seasonNumber, setSeasonNumber ] = useState( params.seasonNumber );

    useEffect( () => {
        const fetchSeasonDetails = async () => {
            try {
                let response = await axios.get( `/show/season/?showId=${ params.showId }&seasonNum=${ seasonNumber }` );
                let results = response.data.results;
                console.log( response )
                setSeasonDetails( results );
            }
            catch ( e ) {
                console.log( e )
            }

        }
        fetchSeasonDetails();
    }, [ params, seasonNumber ] );

    const changeSeason = ( season ) => { setSeasonNumber( season ) }

    if ( Object.keys( seasonDetails ).length === 0 ) {
        return null;
    }

    return <Fragment>
        <MenuOfCanvas type='shows' />

        <h2 style={ { color: 'white', textAlign: 'center', marginTop: '20px' } }>{ seasonDetails.name }</h2>

        <Form.Select aria-label="Default select example" size='sm' onChange={ ( e ) => changeSeason( e.target.value ) }>
            { Array.from( { length: params.numberOfSeasons }, ( _, i ) => 1 + i )
                .map( i => <option defaultValue={ seasonNumber } value={ i } key={ i }>{ i }</option> ) }
        </Form.Select>


        {
            seasonDetails.episodes.map( ( e ) => {
                let imgSrc = null;
                if ( e.still_path === null ) {
                    imgSrc = <Card.Img
                        variant="top"
                        src={ noImage }
                        style={ { height: '170px', width: '200px', margin: 'auto', marginTop: '20px' } }
                    />
                }
                else {
                    imgSrc = <Card.Img
                        variant="top"
                        src={ `https://image.tmdb.org/t/p/w500/${ e.still_path }` }
                        style={ { height: '170px' } }
                    />
                }

                return ( <CardGroup key={ e.id }
                    style={ {
                        width: '85%',
                        margin: 'auto',
                        paddingTop: '20px',
                        marginBottom: '20px'
                    } }>
                    <Card>
                        { imgSrc }
                        <Card.Body>
                            <Card.Title>{ e.name }</Card.Title>
                            <p style={ { fontSize: '14px' } }>{ e.overview }</p>
                        </Card.Body>
                        <Card.Footer style={ { display: 'flex', justifyContent: 'space-between' } }>
                            <small className="text-muted">Release date: { e.air_date }</small>
                            <small className="text-muted">{ e.episode_number }</small>
                        </Card.Footer>
                    </Card>
                </CardGroup> )

            }

            )
        }

    </Fragment>
}

export default SeasonDetails;
