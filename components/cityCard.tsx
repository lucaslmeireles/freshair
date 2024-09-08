import { getAQIColor, getAQIName } from "@/helpers/getAQI";
import { Text, View, Image } from "react-native";
import { Wind } from "react-native-feather";

export function CityCard({ c }) {
  return (
    <>
      <View className="w-32 bg-white mr-2 flex-col pt-2 pb-6 rounded items-center">
        <Text className="text-base">{c.city}</Text>
        <Text className="text-lg">{Math.round(c.temp)}ºC </Text>
        <Text className="text-sm flex-row align-middle justify-center">
          {c.wind}km/h <Wind color="black" height={14} width={14} />
        </Text>

        <Text className="text-sm flex-row">
          {c.humidity}%
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
        <Text className="text-sm">QA</Text>
      </View>
    </>
  );
}
