import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CSS/header.module.css'

const NavigationHeader = () => {
    return (
        <header>
            <nav>
                <ul className={ styles.header } >
                    <li>
                        <NavLink to='/' className={ styles.link }>Movies</NavLink>
                    </li>
                    <li>
                        <NavLink to='/shows' className={ styles.link }>Shows</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    )

}

export default NavigationHeader;