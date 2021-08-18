import React from 'react'
import Card from 'react-bootstrap/Card';

const About = ( { title, description, runtime, genres, status, language, productionCountries } ) => {
    return (
        <div>
            <Card style={ { display: 'grid', gridTemplateColumns: '1fr 1fr 3fr 2fr', } }>

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

            </Card>

            <p>{ description }</p>

            <Card style={ { display: 'grid', gridTemplateColumns: '1fr 1fr' } }>
                <Card.Title style={ { marginLeft: '10px' } }>Status</Card.Title>
                <Card.Title>Genres</Card.Title>

                <p style={ { marginLeft: '10px' } }>{ status }</p>
                <ul style={ { listStyle: 'none', display: 'flex', flexWrap: 'wrap', paddingLeft: '0' } }>

                    {
                        genres.map( genre => <li key={ genre.id } style={ { marginRight: '10px' } }>{ genre.name }.</li> )
                    }
                </ul>
            </Card>
        </div>
    )
}

export default About;