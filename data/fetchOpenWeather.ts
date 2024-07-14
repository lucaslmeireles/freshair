import axios from "axios"


type OpenWeatherLocation = {
    coords : {
        latitude : number;
        longitude : number;
    
    }
}
export type OpenWeatherResponse = {
    polutionData: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
    };
    weatherData: {
        main: string;
        description: string;
        temp: number;
        humidity: number;
        pressure: number;
        wind: number;
    };
    city: string;

}
type OpenweatherCache = OpenWeatherResponse | null

let cacheRequest : OpenweatherCache = null

export const fetchOpenweather = async (location : OpenWeatherLocation ) : Promise<OpenWeatherResponse | OpenweatherCache> => {
    if (cacheRequest !== null) {
        return cacheRequest
    }
    
    const polutionData = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}`
    );
    const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}&units=metric`
    )
    const data = {
        polutionData: polutionData.data.list[0].components,
        weatherData: {
            main: weatherData.data.weather.main,
            description : weatherData.data.weather.description,
            temp : weatherData.data.main.temp,
            humidity : weatherData.data.main.humidity,
            pressure : weatherData.data.main.pressure,
            wind: weatherData.data.wind.speed
        },
        city : weatherData.data.name
    }
    cacheRequest = data
    return data

}

