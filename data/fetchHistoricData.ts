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
type OpenweatherCache = OpenWeatherResponse | null

let cacheRequest : OpenweatherCache = null

export const fetchHistoricData = async (location : OpenWeatherLocation ) => {
    const now = Date.now()
    const start = now - 86400000
    const polutionData = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&start=${start}&end=${now}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}`
    );
    const data = {
        polutionData: polutionData.data.list[0].components,
        aqi: polutionData.data.list[0].main.aqi
    }
    
    return data

}
