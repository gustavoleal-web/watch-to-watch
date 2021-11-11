import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/menu.module.css';
import top from '../../Images/top.png';
import checkin from '../../Images/check-in.png';
import clapperboard from '../../Images/clapperboard.png';
import newIcon from '../../Images/new.png';

//look into refactoring this with a loop

const NavOptions = ( { type, handleClose } ) => {
    if ( type === 'movies' ) {
        return <div className={ styles.icons }>
            <img src={ `${ checkin }` } alt="ribbon" />
            <NavLink to={ `/${ type }/upcoming` } className={ styles.navLink } onClick={ handleClose }>Upcoming</NavLink>

            <img src={ `${ clapperboard }` } alt="ribbon" />
            <NavLink to={ `/${ type }/nowplaying` } className={ styles.navLink } onClick={ handleClose }>Now Playing</NavLink>

            <img src={ `${ top }` } alt="ribbon" />
            <NavLink to={ `/${ type }/toprated` } className={ styles.navLink } onClick={ handleClose }>Top Rated</NavLink>
        </div>
    }

    else if ( type === 'shows' ) {
        return <div className={ styles.icons }>
            <img src={ `${ newIcon }` } alt="ribbon" />
            <NavLink to={ `/${ type }/popular` } className={ styles.navLink } onClick={ handleClose }>Popular</NavLink>

            <img src={ `${ clapperboard }` } alt="ribbon" />
            <NavLink to={ `/${ type }/airingtoday` } className={ styles.navLink } onClick={ handleClose }>Airing Today</NavLink>

            <img src={ `${ top }` } alt="ribbon" />
            <NavLink to={ `/${ type }/toprated` } className={ styles.navLink } onClick={ handleClose }>Top Rated</NavLink>
        </div>
    }
}

export default NavOptions;