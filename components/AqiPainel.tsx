import {
  getAQIColor,
  getAQIName,
  getMostsPoluent,
  getPoluentColors,
} from "@/helpers/getAQI";
import { View, Text, TouchableHighlight } from "react-native";
import { Circle } from "react-native-feather";

export function AqiPainel({ polution, aqi }) {
  const aqiColor = getAQIColor(aqi);
  const mostPoluents = getMostsPoluent(polution);
  return (
    <View
      className="flex p-3 mt-4 rounded-md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.74)",
      }}
    >
      <Text className="font-semibold text-lg py-2 px-2">Qualidade do Ar</Text>
      <View className="flex-row">
        <TouchableHighlight
          className={`flex items-center justify-center h-36 w-36 rounded-full border-8`}
          style={{
            borderColor: aqiColor,
          }}
        >
          <Text className="text-lg font-semibold">{getAQIName(aqi)}</Text>
        </TouchableHighlight>
        <View className="mx-4">
          {mostPoluents.length > 0 ? (
            <>
              <Text className="text-sm font-medium ">Principais poluentes</Text>
              {mostPoluents.map((p) => {
                return (
                  <View className="flex flex-row" key={p.key}>
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
            </>
          ) : (
            <Text className="font-medium w-1/2 p-4">
              Very good! There aren't most polluents in your area
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
