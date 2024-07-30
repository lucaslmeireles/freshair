import {
  getAQIColor,
  getAQIName,
  getMostsPoluent,
  getPoluentColors,
} from "@/helpers/getAQI";
import { View, Text, Touchable, TouchableHighlight } from "react-native";
import { Circle } from "react-native-feather";

export function AqiPainel({ polution, aqi }) {
  const aqiColor = getAQIColor(aqi);
  const mostPoluents = getMostsPoluent(polution);
  return (
    <View className="flex">
      <Text>Your AQI</Text>
      <View className="flex-row">
        <TouchableHighlight
          className={`flex items-center justify-center h-40 w-40 rounded-full border-8`}
          style={{
            borderColor: aqiColor,
          }}
        >
          <Text className="text-lg font-semibold">{getAQIName(aqi)}</Text>
        </TouchableHighlight>
        <View className="mx-4">
          <Text>Principais poluentes</Text>
          {mostPoluents.map((p) => {
            return (
              <View className="flex flex-row">
                <Text>
                  {p.key}
                  <Circle
                    color={getPoluentColors({ poluent: p.key, v: p.value })}
                    fill={getPoluentColors({ poluent: p.key, v: p.value })}
                    height={12}
                    width={12}
                  />
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
