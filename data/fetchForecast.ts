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
    aqi: number;

}


export const fetchForecast = async (location : OpenWeatherLocation ) => {
    const polutionData = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}`
    );
    const data = {
        polutionData: polutionData.data.list
    }


    return data

}
