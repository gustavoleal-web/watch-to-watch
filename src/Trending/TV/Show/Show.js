import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../../Images/No-Image-Placeholder.png';


const Show = ( { showId, name, airDate, posterPath, backdropPath } ) => {
    let posterImg = null;
    if ( posterPath === null ) {
        console.log( 'undefined' )
        posterImg = <img src={ `${ noImage }` } alt='poster' style={ { height: '200px' } } />

    }

    // else if ( posterPath === null && typeof backdropPath === 'string' ) {
    //     posterImg = <img src={ `https://image.tmdb.org/t/p/w300/${ backdropPath }` } alt='poster' style={ { height: '200px' } } />

    // }

    else {
        posterImg = <img src={ `https://image.tmdb.org/t/p/w300/${ posterPath }` } alt='poster' style={ { height: '200px' } } />
    }


    return (
        <div style={ { border: '1px solid black', marginBottom: '20px', marginLeft: '10px', marginRight: '10px' } }>

            <div style={ { display: 'flex' } }>
                { posterImg }
                <div style={ { margin: 'auto' } }>
                    <h4>{ name }</h4>
                    <p>Air Date: { airDate }</p>
                </div>
            </div>

            <Link to={ `shows/${ showId }` }>Load more show info</Link>

            {
                // Object.keys( showMetaData ).length === 0 ? null : <About genres={ showMetaData.genres } overview={ showMetaData.overview } />
            }

        </div>
    )
}

export default Show;