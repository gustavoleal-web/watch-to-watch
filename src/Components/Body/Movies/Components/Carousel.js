import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComp = ( { img } ) => {
    return <Carousel >
        <Carousel.Item interval={ 10000 }>
            <img
                className="d-block w-100"
                src={ `https://image.tmdb.org/t/p/w300/${ img }` }
                alt="First slide"
            />
            <Carousel.Caption>
                <h3>Movie Title</h3>
             
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={ 10000 }>
            <img
                className="d-block w-100"
                src={ `https://image.tmdb.org/t/p/w300/${ img }` }
                alt="Second slide"
            />

            <Carousel.Caption>
                <h3>Movie Title</h3>
            
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={ 10000 }>
            <img
                className="d-block w-100"
                src={ `https://image.tmdb.org/t/p/w300/${ img }` }
                alt="Third slide"
            />

            <Carousel.Caption>
                <h3>Movie Title</h3>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

}

export default CarouselComp;

