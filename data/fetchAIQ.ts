
export async function fetchAIQ(cities: Array<string>) {
    const result = cities.map(async (city) => {
        const weatherdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}&units=metric`, {
            cache : "default"
        })
        const weatherjson = await weatherdata.json()
        const aqidata = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherjson.coord.lat}&lon=${weatherjson.coord.lon}&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}`, {
            cache : "default"
        })
        const aqijson = await aqidata.json()
        return {
            city: city,
            aqi: aqijson.list[0].main.aqi,
            temp: weatherjson.main.temp,
            humidity: weatherjson.main.humidity,
            wind: weatherjson.wind.speed
        }
    })
    
    return Promise.all(result)
}