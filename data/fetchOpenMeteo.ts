import { fetchWeatherApi } from "openmeteo";
type ParamsOpenMeteo = {
    hourly: string[];
    latitude?: number;
    longitude?: number;
}

export const fetchOpenMeteo = async (coords) => {
    const params: ParamsOpenMeteo = {
        "hourly": ["pm10", "pm2_5"]
    };
    params["latitude"] = coords.latitude;
    params["longitude"] = coords.longitude;
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const responses = await fetchWeatherApi(url, params);
    
    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    
    const hourly = response.hourly()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
    
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            pm10: hourly.variables(0)!.valuesArray()!,
            pm25: hourly.variables(1)!.valuesArray()!,
        },
    
    };
    
    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        console.log(
            weatherData.hourly.time[i].toISOString(),
            weatherData.hourly.pm10[i],
            weatherData.hourly.pm25[i]
        );
    }
    return weatherData
}



