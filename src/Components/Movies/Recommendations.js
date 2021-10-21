import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

const CarouselComp = ( { recommendations } ) => {

    return <Fragment>
        <h5 style={ { color: 'rgb(180, 186, 210)' } }>Recommendations</h5>
        <div style={ { backgroundColor: 'rgb(180, 186, 210)' } }>
            {
                recommendations.map( movie =>
                    <div style={ { border: '5px solid white', margin: '5px 10px' } } key={ movie.id }>
                        <Link to={ `/movies/trending/${ movie.id }` }>
                            <img
                                src={ `https://image.tmdb.org/t/p/w300/${ movie.poster_path }` }
                                alt="First slide"
                                style={ { width: '200px' } }
                            />
                        </Link>
                    </div>
                )
            }

        </div>
    </Fragment>
}

export default CarouselComp;

