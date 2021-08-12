import React from 'react'

const About = ( { title, description, runtime, genres } ) => {
    return (
        <div>
            <p>Runtime: { runtime } min.</p>
            <p>{ description }</p>
        </div>
    )
}

export default About;