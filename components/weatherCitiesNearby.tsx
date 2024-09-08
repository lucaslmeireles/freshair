import { fetchAIQ } from "@/data/fetchAIQ";
import { findNearbyCities } from "@/data/fetchNearbyCitties";
import { getAQIColor, getAQIName } from "@/helpers/getAQI";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Wind } from "react-native-feather";
import { CityCard } from "./cityCard";

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
  }, [city]);
  return isLoaded ? (
    <View
      className="flex p-3 mt-4 rounded-md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.74)",
      }}
    >
      <Text className="text-lg py-3 text-black font-bold">
        Cidades perto de mim
      </Text>
      <View className="flex flex-row gap-2">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {weatherCities !== undefined &&
            weatherCities.map((c) => {
              return <CityCard c={c} key={c.city} />;
            })}
        </ScrollView>
      </View>
    </View>
  ) : (
    <Text className="text-lg text-white">Loading...</Text>
  );
}
