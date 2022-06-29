import React, { useState, useEffect, useRef } from 'react';
import {movieimage} from '../config';


const ImgModalWon = ({ text }) => {

    const found = text['found'];
    const lostgame = text['lostgame'];

    const [showImage, setshowImage] = useState(true);

    const count = text['count'];
    const a = text['a'];

    const toggleModal = () => {
        setshowImage(!showImage);
      };

    return (
        <div>
            <a onClick={toggleModal} className="btn-modal">
                Show Image
            </a>

            {showImage && (
                <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    {
                        showImage ? 
                        <div>
                            {
                            found || lostgame ? 
                            <div>
                            {
                                found ?
                                <div>
                                <h3>YOU WON</h3>
                                <h1>{a.name}</h1>
                                <h4>Solved in {count} guesses</h4>
                                </div>
                                :
                                <div>
                                <h3>YOU LOST</h3>
                                <h1>{a.name}</h1>
                                </div> 
                            }
                            </div>
                            : null
                            }
                            <div>
                                <img id="myimg" src={movieimage} width = "600"></img>
                                <a className="close-modal" onClick={() =>
                                    {toggleModal;
                                    setshowImage(false);}}>
                                X
                                </a>
                            </div>
                        </div>
                        : null
                    }
                </div>
                </div>
            )}

            </div>  
          
    )
    
}

export default ImgModalWon