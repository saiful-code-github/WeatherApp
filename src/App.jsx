import React from 'react';
import './app.css';
// import { GetApi } from './API/GetApi';
import { Weather } from './Weather';

const App = () => {
    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "100px", textTransform: "capitalize" }} className={`text-[38px] font-black bg-gradient-to-r to-blue-400 from-white to-57% from-40% gradient_text`}>
                Weather App
            </h1>
            <Weather/>        
            {/* <GetApi/> */}
        </>
    );
}

export default App;
