import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { fetchOpenweather, OpenWeatherResponse } from "@/data/fetchOpenWeather";
import { WeatherPainel } from "@/components/weatherPainel";
import { WeatherCitiesNearBy } from "@/components/weatherCitiesNearby";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { AqiPainel } from "@/components/AqiPainel";

export default function HomeScreen() {
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState({} as OpenWeatherResponse);
  const [isLoaded, setIsLoaded] = useState(false);
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

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
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView>
        {isLoaded ? (
          <View className="flex mx-4 py-2">
            <Text className="text-lg font-medium">Hello, you're at</Text>
            <WeatherPainel weather={weather} />
            <AqiPainel polution={weather.polutionData} aqi={weather.aqi} />
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
}
