import React from 'react';
import './App.css';

const Heart = ({ attemps, maxAttemps })=>{
return(
    <div id='life'>
        {
            attempsToHeart(attemps, maxAttemps).map(
                (value, index) => {
                    return <span key={ 'heart_' + index } className={'heart ' + ((value === 1) ? 'full' : 'empty')}></span>
                }
            )
        }
    </div>
)
}

function attempsToHeart(attemps, maxAttemps) {
    let hearts = [];
    for (let i=1; i<=maxAttemps; i++) {
        if (i<= attemps) {
            hearts.push(0);
        } else {
            hearts.push(1);
        }
    }
    return hearts;
}

export default Heart;