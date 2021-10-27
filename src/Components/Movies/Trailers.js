import React, { Fragment } from 'react';
import ReactPlayer from 'react-player/youtube';

const Trailers = ( { videos } ) => {
    return <div>
        <h4>Trailers</h4>
        {
            videos.map( video => <Fragment key={ video.id } >
                <ReactPlayer
                    url={ `https://www.youtube.com/watch?v=${ video.key }` }
                    controls={ true }
                    light={ true }
                    height='200px'
                    width='300px'
                />
                <p style={ { color: 'white' } }>{ video.name }</p>
            </Fragment>
            )
        }
    </div >
}

export default Trailers;
