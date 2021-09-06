import React, { Fragment } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'

const CarouselComp = ( { recommendations } ) => {

    return <Fragment>
        <Carousel style={ { backgroundColor: 'black' } }>
            {
                recommendations.map( movie =>
                    <Carousel.Item interval={ 100000 } key={ movie.id }>
                        <Link to={ `/movies/${ movie.id }` }>
                            <img
                                src={ `https://image.tmdb.org/t/p/w300/${ movie.poster_path }` }
                                alt="First slide"
                                style={ { width: '200px', marginLeft: '70px' } }
                            />
                        </Link>
                    </Carousel.Item>
                )
            }

        </Carousel>
    </Fragment>
}

export default CarouselComp;

