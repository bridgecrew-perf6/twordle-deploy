import React, { useState, useEffect, useRef } from 'react';
import {movieimage} from '../config';


const AboutModal = () => {


    const [showAbout, setshowAbout] = useState(false);

    return (
        <div>
            <button onClick={() =>
                setshowAbout(true)
            }>About</button>

{
            showAbout ? 
                <div>
                    <h2>Guess the telugu movie!!</h2>
                    <ul>
                        <h6>You have 6 chances to guess the movie based on the movie scene provided</h6>
                        <h6>Green indicates a perfect match</h6>
                        <h6>Yellow indicates a partial match</h6>
                    </ul>
                    
                </div>
                : null
            }
        </div>
    )
}

export default AboutModal