import axios from "axios";
import { useState } from "react"


export const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39a1eb2977b639d4720e10bc21025700`
    //get data with api
    const getData = async() => {
        if(!city){
            return alert("please fill the city name")
        }
         try {
            const res = await axios.get(url);
            setWeatherData(res.data);
            setCity("")
         } catch (error) {
            console.log(error)
         }
    }
    //handleClick
    const handleClick = (e) => {
        e.preventDefault();
        getData();
    }
    return (
       <div className="bg-blue-200 shadow-2xl mx-auto rounded-[10px] py-[25px] px-[35px] flex flex-col justify-center max-w-[500px] mt-[30px]">
          <div className="w-full flex flex-row">
              <input type="text" value={city} placeholder="Enter City Name" onChange={(e)=> setCity(e.target.value)} className="outline-0 border-b-[1px] border-black text-black w-[90%] py-[10px]"/>
              <button className="bg-black text-white py-[10px] px-[15px] w-[40%]" onClick={handleClick}>Get Weather</button>
          </div>

          {weatherData && (
            <div className=" text-center mt-[25px]">
                <h2 className="font-semibold capitalize text-2xl">{weatherData.name}</h2>
                 <h2>Temperature: {weatherData.main.temp} </h2>
                 <img src={` https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" className="mx-auto" />
                 <h4>Weather: {weatherData.weather[0].description}</h4>
            </div>
          )}
       </div>
    )
}