import React from 'react';
import { Fragment } from 'react';

const Provider = ( { service, serviceName } ) => {
    const style = {
        display: 'flex',
        backgroundColor: '#333',
        overflow: 'auto',
        whiteSpace: 'nowrap'
    }

    if ( service.length === 0 ) {
        return null;
    }

    return <Fragment>
        <h5>{ serviceName }</h5>
        <div style={ style }>
            {
                service.map( s =>
                    <div key={ s.provider_id } style={ { width: '100px', padding: '10px' } }>
                        <img src={ `https://image.tmdb.org/t/p/original${ s.logo_path }` } alt="" style={ { height: '50px', width: '50px', borderRadius: '10px' } } />
                    </div>
                )
            }
        </div>


    </Fragment>




}

export default Provider;