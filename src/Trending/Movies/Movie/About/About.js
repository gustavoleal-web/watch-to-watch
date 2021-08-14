import React from 'react'

const About = ( { title, description, runtime, genres, status, language, productionCountries } ) => {
    return (
        <div>
            <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 3fr 2fr' } }>
                <p>Type</p>
                <p>Lang</p>
                <p>Produced In</p>
                <p>Runtime</p>

                <p style={ { margin: '0' } }>Movie</p>
                <p style={ { margin: '0' } }> { language.toUpperCase() }</p>
                {
                    productionCountries.map( company => <p key={ company.name } style={ { margin: '0' } }>{ company.iso_3166_1 }</p> )
                }
                <p style={ { margin: '0' } }> { runtime } min.</p>

            </div>


            <p>{ description }</p>

            <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr' } }>
                <h4 style={ { margin: '0' } }>Status</h4>
                <h4 style={ { margin: '0' } }>Genres</h4>
                <p>{ status }</p>
                <ul style={ { listStyle: 'none', display: 'flex', flexWrap: 'wrap', paddingLeft: '0' } }>

                    {
                        genres.map( genre => <li key={ genre.id } style={ { marginRight: '10px' } }>{ genre.name }.</li> )
                    }
                </ul>
            </div>


        </div>
    )
}

export default About;