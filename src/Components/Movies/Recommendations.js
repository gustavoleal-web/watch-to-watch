import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import styles from './css/recommend.module.css';

const CarouselComp = ( { recommendations } ) => {
    return <Fragment>
        <h4>Recommendations</h4>
        <div className={ styles.mainContainer }>
            {
                recommendations.map( movie => {
                    let imgSource = `https://image.tmdb.org/t/p/w300${ movie.poster_path }`;
                    return (
                        <div className={ styles.posterContainer } key={ movie.id }>

                            <Link to={ `/movies/trending/${ movie.id }` }>
                                <img
                                    src={ imgSource }
                                    alt='movie poster'
                                    className={ styles.poster }
                                />
                            </Link>
                        </div>
                    )

                } )
            }
        </div>

    </Fragment>
}

export default CarouselComp;

