import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../Images/No-Image-Placeholder.png';
import styles from './css/collection.module.css'

const CollectionPoster = ( { posterPath, title, partId, movieId, handleClose } ) => {
    let posterSrc;
    let intMovieId = parseInt( movieId );

    if ( posterPath === null ) {
        posterSrc = noImage;

        return (
            <span>
                <img src={ posterSrc } alt={ title } className={ styles.poster } />
                <p style={ { fontSize: '14px' } }>{ title }</p>
            </span>


        )
    }
    //prevents the unnecessary rerender of the same movie
    else if ( partId === intMovieId && !isNaN( movieId )) {
        return <span>
            <img src={ `https://image.tmdb.org/t/p/w300${ posterPath }` } alt={ title } className={ styles.poster } />
        </span>
    }

    else {
        return (
            <Link to={ `/movies/trending/${ partId }` } onClick={ handleClose }>
                <img src={ `https://image.tmdb.org/t/p/w300${ posterPath }` } alt={ title } className={ styles.poster } />
            </Link>
        )
    }


}

export default CollectionPoster;