import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { fetchOpenweather, OpenWeatherResponse } from "@/data/fetchOpenWeather";
import { WeatherPainel } from "@/components/weatherPainel";
import { findNearbyCities } from "@/data/fetchNearbyCitties";
import { WeatherCitiesNearBy } from "@/components/weatherCitiesNearby";
type weatherType = OpenWeatherResponse;

export default function HomeScreen() {
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState({} as weatherType);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const weather = await fetchOpenweather(location);
        weather !== null && setWeather(weather);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, []);

  return (
    <SafeAreaView>
      {isLoaded ? (
        <View className="flex mx-4 py-2">
          <WeatherPainel weather={weather} />
          <WeatherCitiesNearBy city={weather.city} />
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
