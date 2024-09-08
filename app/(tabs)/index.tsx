import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { fetchOpenweather, OpenWeatherResponse } from "@/data/fetchOpenWeather";
import { WeatherPainel } from "@/components/weatherPainel";
import { WeatherCitiesNearBy } from "@/components/weatherCitiesNearby";
import { AqiPainel } from "@/components/AqiPainel";
import LottieView from "lottie-react-native";
import { HistoricData } from "@/components/historicData";
import { getBg } from "@/helpers/getBg";
import { AqiInfo } from "@/components/AqiInfo";
import { ForecastData } from "@/components/forecastData";

export default function HomeScreen() {
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState({} as Location.LocationObject);
  const [weather, setWeather] = useState({} as OpenWeatherResponse);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bg, setBg] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setBg(getBg());
        const weather = await fetchOpenweather(location);
        console.log(weather);
        weather !== null && setWeather(weather);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, []);
  return (
    <ImageBackground
      source={
        bg === "day"
          ? require("../../assets/images/bg-day.png")
          : require("../../assets/images/bg-night.png")
      }
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
      }}
      imageStyle={{
        opacity: 0.8,
      }}
    >
      <StatusBar barStyle="dark-content" translucent />
      <ScrollView className="py-3">
        {isLoaded ? (
          <View className="flex mx-4 pb-8">
            <View className="flex flex-row justify-between">
              <Text
                className={`text-lg mt-5 ${
                  bg === "night" ? "text-white font-semibold" : "text-black"
                }`}
              >
                {weather.city}
              </Text>
            </View>

            <WeatherPainel weather={weather} />
            <AqiPainel polution={weather.polutionData} aqi={weather.aqi} />
            <WeatherCitiesNearBy city={weather.city} />
            <HistoricData location={location} />
            <ForecastData location={location} />
            <AqiInfo />
          </View>
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
