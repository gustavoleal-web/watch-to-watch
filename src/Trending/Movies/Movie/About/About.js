import React from 'react'

const About = ( { title, description, runtime, genres, status } ) => {
    return (
        <div>

            <p>Runtime: { runtime } min.</p>
            <p>{ description }</p>

            <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr' } }>
                <h4 style={ { margin: '0' } }>Status</h4>
                <h4 style={ { margin: '0' } }>Genres</h4>
                <p>{ status }</p>
                <ul style={ { listStyle: 'none', display: 'flex', flexWrap: 'wrap', paddingLeft: '0' } }>

                    {
                        genres.map( genre => <li key={ genre.id } style={{marginRight: '10px'}}>{ genre.name }.</li> )
                    }
                </ul>
            </div>


        </div>
    )
}

export default About;