import React, { useState, useEffect } from 'react';



const Controls = props => {

    const [kirkName, setKirkName] = useState('Bebop');
    const [enzoName, setEnzoName] = useState('Rock Steady');

    function showName(nameId, shouldShow) {
        let authorEl = document.getElementById(nameId);
//        console.log('showName', authorEl);
        if (authorEl) {
            if (nameId === 'kirk') {
                if (shouldShow) {
                    authorEl.innerText = 'Kirk H';         
                } else {
                    authorEl.innerText = 'Bebop';
                }    
            } else if (nameId === 'enzo') {
                if (shouldShow) {
                    authorEl.innerText = 'Enzo Staton';         
                } else {
                    authorEl.innerText = 'Rock Steady';
                }    
            }    
        }
    }

    return (
        <div className="controls-container">
            <h2><span id="kirk" onMouseOver={() => showName('kirk', true) } onMouseOut={() => showName('kirk', false)}>{kirkName}</span> and <span id="enzo" onMouseOver={() => showName('enzo', true)} onMouseOut={() => showName('enzo', false)}>{enzoName}</span> present...</h2>
            <h1 className="title">Krang</h1>
            <img src="/4653194_0.png" />
            <h3 className="title">A React band on a web page</h3>
        </div>
    )
}

export default Controls;