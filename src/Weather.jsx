import axios from "axios";
import { useEffect, useState } from "react"
import './index.css'

export const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    //get data with api
    const getData = async(defaultCity = city) => {
        setLoading(true);
        setError(false)
        if (!defaultCity) {
            return;
        }
         try { 
            const apiKey = 'a7269d6d493d3531065a0480e789324f'
            const url = "https://api.openweathermap.org/data/2.5/weather"
            const res = await axios.get(url, {
                params: {
                    appid: apiKey,
                    q : defaultCity,
                    units: "metric"
                }
            });
            console.log(res.data)
            setWeatherData(res.data);
            setCity("")
            setLoading(false)
         } catch (error) {
            console.log(error);
            setError("Faild to Fetch Data ", error)
            setWeatherData("");
         }finally{
            setLoading(false)
         }
    }
    useEffect(()=>{
        getData("Kolkata");
    },[])
    return (
       <div className="bg-blue-200 shadow-2xl mx-auto rounded-[10px] py-[25px] px-[35px] flex flex-col justify-center max-w-[500px] mt-[30px]">
          <div className={` w-full flex flex-row`}>
              <input type="text" value={city} placeholder="Enter City Name" onChange={(e)=> setCity(e.target.value)} className={`outline-0 border-b-[1px] border-black  text-black w-[90%] py-[10px]`}/>
              <button className="bg-black text-white py-[10px] cursor-pointer px-[15px] w-[40%]" onClick={()=>getData(city)}>Get Weather</button>
          </div>
          {loading && <p className="text-center mt-[20px] mb-[15px] text-black text-[18px]">Loading...</p>}
          {error && <p className="text-center text-red-700">{error}</p>}
          {weatherData && (
            <div className=" text-center mt-[25px]">
                <h2 className="font-semibold capitalize text-2xl">{weatherData.name}</h2>
                 <h2>Temperature: {weatherData.main.temp} °C</h2>
                 <img src={` https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" className="mx-auto" />
                 <h4>Weather: {weatherData.weather[0].description}</h4>
                 <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                 <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          )}
       </div>
    )
}