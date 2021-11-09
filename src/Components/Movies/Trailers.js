import React from 'react';
import ReactPlayer from 'react-player/youtube';
import styles from './css/trailers.module.css'

const Trailers = ( { videos } ) => {
    return <div className={ styles.outerContainer }>
        <h4>Trailers</h4>

        <div className={ styles.playerMainContainer }>
            {
                videos.map( video => {
                    if ( video.site === 'YouTube' ) {
                        return <div key={ video.id } >
                            <ReactPlayer
                                url={ `https://www.youtube.com/watch?v=${ video.key }` }
                                controls={ true }
                                light={ true }
                                width='17rem'
                                height='10rem'
                                className={ styles.reactPlayer }
                            />
                            <p style={ { color: 'white', fontSize: '12px' } }>{ video.name }</p>
                        </div>

                    }
                    return true;
                }
                )
            }
        </div>
    </div >
}

export default Trailers;
