import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import styles from './css/recommend.module.css';

const CarouselComp = ( { recommendations, mediaType } ) => {
    return <Fragment>
        <h4>Recommendations</h4>
        <div className={ styles.mainContainer }>
            {
                recommendations.map( r => {
                    let imgSource = `https://image.tmdb.org/t/p/w300${ r.poster_path }`;
                    return (
                        <div className={ styles.posterContainer } key={ r.id }>

                            <Link to={ `/${ mediaType }/trending/${ r.id }` }>
                                <img
                                    src={ imgSource }
                                    alt='poster'
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

