import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';

const SeasonDetails = () => {
    const [ seasonDetails, setSeasonDetails ] = useState( {} )
    const params = useParams();



    useEffect( () => {
        const fetchSeasonDetails = async () => {
            try {
                let response = await axios.get( `/show/season/?showId=${ params.showId }&seasonNum=${ params.seasonNumber }` );
                let results = response.data.results;
                console.log( results )
                setSeasonDetails( results );
                // setSeasonNumber( results.season_number );
            }
            catch ( e ) {
                console.log( e )
            }

        }
        fetchSeasonDetails();
    }, [ params.showId, params.seasonNumber ] );


    if ( Object.keys( seasonDetails ).length === 0 ) {
        return true;
    }

    return <Fragment>
        {
            seasonDetails.episodes.map( ( e ) => <CardGroup key={ e.id }
                style={ {
                    width: '85%',
                    margin: 'auto',
                    paddingTop: '20px',
                    marginBottom: '20px'
                } }>
                <Card>
                    <Card.Img variant="top" src={ `https://image.tmdb.org/t/p/w500/${ e.still_path }` } style={ { height: '170px' } } />
                    <Card.Body>
                        <Card.Title>{ e.name }</Card.Title>
                        <p style={ { fontSize: '14px' } }>{ e.overview }</p>
                    </Card.Body>
                    <Card.Footer style={ { display: 'flex', justifyContent: 'space-between' } }>
                        <small className="text-muted">Release date: { e.air_date }</small>
                        <small className="text-muted">{ e.episode_number }</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
            )
        }

    </Fragment>





}

export default SeasonDetails;
