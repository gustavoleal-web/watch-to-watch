import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import styles from './css/recommend.module.css';

const CarouselComp = ( { recommendations } ) => {
    return <Fragment>
        <h4>Recommendations</h4>
        <div className={ styles.mainContainer }>
            {
                recommendations.map( movie =>
                    <div className={ styles.posterContainer } key={ movie.id }>
                        <Link to={ `/movies/trending/${ movie.id }` }>
                            <img
                                src={ `https://image.tmdb.org/t/p/w300/${ movie.poster_path }` }
                                alt='movie poster'
                                className={ styles.poster }
                            />
                        </Link>
                    </div>
                )
            }
        </div>

    </Fragment>
}

export default CarouselComp;

