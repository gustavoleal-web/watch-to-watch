import React from 'react';
import { Link } from 'react-router-dom';

const NavigationHeader = () => {
    return (
        <header>
            <nav>
                <ul style={ { display: 'flex', justifyContent: 'space-evenly', listStyle: 'none', padding: '0' } }>
                    <li>
                        <Link to='/' style={ { textDecoration: 'none' } }>Movies</Link>
                    </li>
                    <li>
                        <Link to='/shows' style={ { textDecoration: 'none' } }>Shows</Link>
                    </li>
                </ul>
            </nav>
        </header>

    )

}

export default NavigationHeader;