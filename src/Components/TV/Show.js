import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Movies/css/movie.module.css';
import noImage from '../../Images/No-Image-Placeholder.png'


const Show = ( { showId, name, airDate, posterPath, backdropPath, rating, option } ) => {
    let linkPath = `/shows/${ option }/${ showId }`;
    
    let posterImg = null;
    if ( posterPath === null ) {
        posterImg = <img src={ `${ noImage }` } alt='poster' style={ { height: '100%' } } />

    }

    else {
        posterImg = <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '100%' } } />
    }

    let regex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    let refactedAirDate = airDate.replace( regex, '$2/$3/$1' );

    return (

        <div className={ styles.movieContainer }>
            <div className={ styles.movieDisplay }>
                <Link to={ linkPath }>
                    { posterImg }
                </Link>


                <div className={ styles.movieMain }>
                    <h6>{ name }</h6>
                    <p>Air Date: { refactedAirDate }</p>
                </div>
                <p className={ styles.rating }>{ rating }/10</p>
            </div>
        </div>
    )
}

export default Show;