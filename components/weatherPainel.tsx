import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getPoluentColors } from "@/helpers/getAQI";
import LottieView from "lottie-react-native";

export function WeatherPainel({ weather }) {
  const [currentDataKey, setCurrentDataKey] = useState(
    Object.keys(weather.polutionData)[0]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const keys = Object.keys(weather.polutionData);
      const nextIndex = (keys.indexOf(currentDataKey) + 1) % keys.length;
      setCurrentDataKey(keys[nextIndex]);
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, [currentDataKey]);

  return (
    <View className="flex-col w-full flex justify-start">
      <View className="flex flex-row justify-between">
        <View className="w-4/12  bg-slate-200 flex-row items-baseline justify-center rounded-t-md pb-1">
          <Text
            className="text-xl pr-1 font-medium font-Inter_500Medium"
            style={{
              color: getPoluentColors({
                poluent: currentDataKey,
                v: weather.polutionData[currentDataKey],
              }),
            }}
          >
            {weather.polutionData[currentDataKey]}
          </Text>
          <Text
            className="text-xs font-semibold text-slate-700 items-center align-middle"
            style={{
              fontFamily: "Inter_600SemiBold",
            }}
          >
            {currentDataKey.toUpperCase()}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center pt-2 justify-around bg-white pb-2 border-b border-neutral-400 rounded-b-md">
        <View className="flex">
          <Text className="text-base text-slate-600">Temperatura</Text>
          <Text className="text-lg font-medium">
            {weather.weatherData.temp} C
          </Text>
        </View>
        <View className="w-[1px] h-3/5 bg-neutral-600" />
        <View className="flex">
          <Text className="text-base text-slate-600">Vento</Text>
          <Text className="text-lg font-medium font-Inter">
            {weather.weatherData.wind}km/h
          </Text>
          <View />
        </View>
        <View className="w-[1px] h-3/5 bg-neutral-600" />
        <View className="flex">
          <Text className="text-base text-slate-600">Humidade</Text>
          <Text className="text-lg font-medium">
            {weather.weatherData.humidity}%
          </Text>
          <View />
        </View>
      </View>
    </View>
  );
}
