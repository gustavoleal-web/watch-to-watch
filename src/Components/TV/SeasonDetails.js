import React from 'react';

const SeasonDetails = ( { season } ) => {
    console.log( season );
    return <div style={ { display: 'grid', gridTemplateColumns: '1fr 2fr', width: '100%', border: '1px solid black' } }>
        <img style={{height: '100%', width:'100px'}} src={ `https://image.tmdb.org/t/p/w300/${ season.episodes[ 0 ].still_path  }` } alt="" />
        <div>
            <h6>{ season.episodes[ 0 ].name }</h6>
            <p>{ season.episodes[ 0 ].overview }</p>
        </div>
    </div>
}

export default SeasonDetails;
