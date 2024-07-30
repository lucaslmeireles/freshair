import { fetchAIQ } from "@/data/fetchAIQ";
import { findNearbyCities } from "@/data/fetchNearbyCitties";
import { getAQIColor, getAQIName } from "@/helpers/getAQI";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Wind } from "react-native-feather";

export function WeatherCitiesNearBy({ city }) {
  const [weatherCities, setWeatherCities] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchNearbyCities = async () => {
      if (city !== undefined) {
        const data = await findNearbyCities(city);
        const cities = Array.from(data);
        const weatherAQI = await fetchAIQ(cities);
        weatherAQI !== undefined && setWeatherCities(weatherAQI);
        setIsLoaded(true);
      }
    };
    fetchNearbyCities();
  }, []);
  return isLoaded ? (
    <>
      <Text className="text-lg py-3">Cities Nearby Me</Text>
      <View className="flex-row overflow-auto w-full gap-3">
        {weatherCities !== undefined &&
          weatherCities.map((c) => {
            return (
              <View
                key={c.city}
                className="w-5/12 px-1 bg-white flex-col pt-2 pb-6 rounded items-center"
              >
                <Text className="text-base">{c.city}</Text>
                <Text className="text-lg">{Math.round(c.temp)}ºC </Text>
                <Text className="text-sm flex-row align-middle justify-center">
                  {c.wind}km/h <Wind color="black" height={14} width={14} />
                </Text>

                <Text className="text-sm flex-row">
                  {c.humidity}%{" "}
                  <Image
                    source={require("../assets/images/icons8-wet-26.png")}
                    className="w-3 h-3"
                  />
                </Text>

                <Text
                  className="text-base"
                  style={{
                    color: getAQIColor(c.aqi),
                  }}
                >
                  {getAQIName(c.aqi)}
                </Text>
                <Text className="text-sm">AQI</Text>
              </View>
            );
          })}
      </View>
    </>
  ) : (
    <Text>Loading...</Text>
  );
}
