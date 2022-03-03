import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../Images/No-Image-Placeholder.png';
import styles from './css/collection.module.css';

const CollectionPoster = ( { media, posterPath, title, partId, currentMediaId, handleClose, seasonNumber, numberOfSeasons } ) => {
    let posterSrc;
    let intId = parseInt( currentMediaId );

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
    else if ( partId === intId && !isNaN( currentMediaId ) ) {
        return <span>
            <img src={ `https://image.tmdb.org/t/p/w300${ posterPath }` } alt={ title } className={ styles.poster } />
        </span>
    }

    else if ( media === 'movie' ) {
        return (
            <Link to={ `/movies/trending/${ partId }` } onClick={ handleClose }>
                <img src={ `https://image.tmdb.org/t/p/w300${ posterPath }` } alt={ title } className={ styles.poster } />
            </Link>
        )
    }

    else if ( media === 'tv' ) {
        return <Link to={ `/shows/${ currentMediaId }/season/${ seasonNumber }/of/${ numberOfSeasons }` }>
            <img src={ `https://image.tmdb.org/t/p/w300${ posterPath }` } alt={ title } className={ styles.poster } />
        </Link >

    }


}

export default CollectionPoster;