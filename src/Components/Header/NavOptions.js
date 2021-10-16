import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/menu.module.css';
import top from '../../Images/top.png';
import checkin from '../../Images/check-in.png';
import clapperboard from '../../Images/clapperboard.png';
import newIcon from '../../Images/new.png';

const NavOptions = ( { type } ) => {
    if ( type === 'movies' ) {
        return <div className={ styles.icons }>
            <img src={ `${ checkin }` } alt="ribbon" />
            <NavLink to={ `/${ type }/upcoming` } className={ styles.navLink }>Upcoming</NavLink>

            <img src={ `${ clapperboard }` } alt="ribbon" />
            <NavLink to={ `/${ type }/nowplaying` } className={ styles.navLink }>Now Playing</NavLink>

            <img src={ `${ top }` } alt="ribbon" />
            <NavLink to={ `/${ type }/toprated` } className={ styles.navLink }>Top Rated</NavLink>
        </div>
    }

    else if ( type === 'shows' ) {
        return <div className={ styles.icons }>
            <img src={ `${ newIcon }` } alt="ribbon" />
            <NavLink to={ `/${ type }/latest` } className={ styles.navLink }>Latest</NavLink>

            <img src={ `${ clapperboard }` } alt="ribbon" />
            <NavLink to={ `/${ type }/airingtoday` } className={ styles.navLink }>Airing Today</NavLink>

            <img src={ `${ top }` } alt="ribbon" />
            <NavLink to={ `/${ type }/toprated` } className={ styles.navLink }>Top Rated</NavLink>
        </div>
    }
}

export default NavOptions;