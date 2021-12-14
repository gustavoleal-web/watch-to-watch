import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

// const SeasonDetails = ( { season } ) => {
//     console.log( season );
//     return <div style={ { display: 'grid', gridTemplateColumns: '1fr 2fr', width: '100%', border: '1px solid black' } }>
//         <img style={{height: '100%', width:'100px'}} src={ `https://image.tmdb.org/t/p/w300/${ season.episodes[ 0 ].still_path  }` } alt="" />
//         <div>
//             <h6>{ season.episodes[ 0 ].name }</h6>
//             <p>{ season.episodes[ 0 ].overview }</p>
//         </div>
//     </div>
// }

const SeasonDetails = () => {
    const [ seasonDetails, setSeasonDetails ] = useState( {} )
    const params = useParams();

    useEffect( () => {
        const fetchSeasonDetails = async () => {
            try {
                let response = await axios.get( `/show/season/?showId=${ params.showId }&seasonNum=${ params.seasonNumber }` );
                let results = response.data.results;
                console.log( results )
                setSeasonDetails( results );
                // setSeasonNumber( results.season_number );
            }
            catch ( e ) {
                console.log( e )
            }

        }
        fetchSeasonDetails();
    }, [ params.showId, params.seasonNumber ] );

    
    return <div>
        Season details
    </div>
}

export default SeasonDetails;
