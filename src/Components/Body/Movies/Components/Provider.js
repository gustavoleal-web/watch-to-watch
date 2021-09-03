import React from 'react';

const Provider = ( { service } ) => {

    if ( service.length === 0 ) {
        return null;
    }

    return <div>
        {
            service.map( s =>
                <p key={ s.provider_id }>{ s.provider_name }</p> )
        }

    </div>




}

export default Provider;