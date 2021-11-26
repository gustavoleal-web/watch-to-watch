import React, { Fragment } from 'react';
import styles from '../Movies/css/provider.module.css'

const Provider = ( { service, serviceName } ) => {

    if ( service.length === 0 ) {
        return null;
    }

    return <Fragment>
        <h5 className={ styles.serviceName }>{ serviceName }</h5>
        <div className={ styles.mainContainer }>
            {
                service.map( s =>
                    <div key={ s.provider_id } className={ styles.logoContainer }>
                        <img src={ `https://image.tmdb.org/t/p/original${ s.logo_path }` } alt="" className={ styles.logo } />
                    </div>
                )
            }
        </div>
    </Fragment>
}

export default Provider;