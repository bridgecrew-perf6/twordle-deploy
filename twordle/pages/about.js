import Head from 'next/head'

const about = () => {
    return (
        <div>
        <title>About</title>  
        <div>
                    <h2>Guess the telugu movie!!</h2>
                    <ul>
                        <h4>You have 6 chances to guess the movie based on the movie scene provided (Click "SHOW IMAGE")</h4>
                        <h5>Green indicates a perfect match for the column</h5>
                        <h5>Yellow indicates a partial match:</h5>
                        <h6> 
                        <ul>
                            <li>Yellow in the year column indicates that the guessed movie is within two years of the actual movie's year</li>
                            <li>Yellow in the genre column indicates that there is at least one overlapping genre between the guessed and actual movie's genre(s)</li>
                            <li>Yellow in the rating column indicates that the guessed movie is within 0.2 of the actual movie's rating</li>
                            <li>Yellow in the length column indicates that the guessed movie is within 10 minutes of the actual movie's length</li>
                            <li>Yellow in the main actor(s) column indicates that there is at least one overlapping actor between the guessed and actual movie's actor(s)</li>
                        </ul>
                        </h6>
                    </ul>
                    
                </div>
        </div>
    )
}

export default about