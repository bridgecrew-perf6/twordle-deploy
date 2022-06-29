import React, { useState, useEffect, useRef } from 'react';
import {movieimage} from '../config';
import Popup from '../components/Popup';


const ImgModal = () => {


    const [showImage, setshowImage] = useState(false);
    const toggleModal = () => {
        setshowImage(!showImage);
      };

    return (
        <>
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
                            <img id="myimg" src={movieimage} width = "600"></img>
                        </div>
                        : null
                    }   
                    <a className="close-modal" onClick={toggleModal}>
                    X
                    </a>
                </div>
                </div>
            )}
        </>
    );
}

export default ImgModal