import React from 'react';
import noImage from '../../Images/No-Image-Placeholder.png';
import styles from './css/collection.module.css'

const CollectionPoster = ( { posterPath, title } ) => {

    let posterSrc;

    if ( posterPath === null ) {
        posterSrc = noImage;

        return (
            <span>
                <img src={ posterSrc } alt={ title } className={ styles.poster } />
                <p style={ { fontSize: '14px' } }>{ title }</p>
            </span>
        )
    }

    else {
        return (
            <img src={ `https://image.tmdb.org/t/p/w300${ posterPath }` } alt={ title } className={ styles.poster } />
        )
    }


}

export default CollectionPoster;