import React from 'react';
import { useParams } from 'react-router-dom';

const SelectedGenre = () => {
    const params = useParams();
    console.log(params)
    return <div>Genre</div>
}

export default SelectedGenre;