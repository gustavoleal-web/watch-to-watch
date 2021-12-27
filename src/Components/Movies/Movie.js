import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/movie.module.css';
import noImage from '../../Images/No-Image-Placeholder.png';


const Movie = ( { title, releaseDate, posterPath, movieId, option, rating } ) => {
    //since SearchedMedia component is using the movie component to render searched tv shows
    //when the use clicks on the show it will return the movie with the matching id not 
    //clicked tv show. 
    //solution are to pass a prop to determine the type or to make show and movie into a single component
    let linkPath = `/movies/${ option }/${ movieId }`;
    let posterSrc = posterPath === null ? noImage : `https://image.tmdb.org/t/p/w300/${ posterPath }`

    let mmddyyyy
    //converts yyyy-mm-dd to mm/dd/yyyy
    if ( releaseDate !== undefined ) {
        let regex = /(\d{4})-(\d{1,2})-(\d{1,2})/
        let str = releaseDate;
        mmddyyyy = str.replace( regex, '$2/$3/$1' );
    }

    else {
        mmddyyyy = null;
    }


    return (

        <div className={ styles.movieContainer }>
            <div className={ styles.movieDisplay }>
                <Link to={ linkPath }>
                    <img src={ posterSrc } alt='poster' style={ { height: '100%' } } />
                </Link>
                <div className={ styles.movieMain }>
                    <h6>{ title }</h6>
                    <p>{ mmddyyyy }</p>
                </div>
                <p className={ styles.rating }>{ rating }/10</p>
            </div>
        </div>
    )
}


export default Movie;