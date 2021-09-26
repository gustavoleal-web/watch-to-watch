import React from 'react';
import { Fragment } from 'react';

const Provider = ( { service, serviceName } ) => {

    if ( service.length === 0 ) {
        return null;
    }

    return <Fragment>
        <h5>{ serviceName }</h5>
        <div style={ { display: 'flex', flexWrap: 'wrap' } }>
            {
                service.map( s =>
                    <div key={ s.provider_id } style={ { width: '100px' } }>
                        <img src={ `https://image.tmdb.org/t/p/original${ s.logo_path }` } alt="" style={ { height: '50px', width: '50px', borderRadius: '10px' } } />
                    </div>
                )
            }
        </div>


    </Fragment>




}

export default Provider;