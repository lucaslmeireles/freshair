import { LineChart } from "react-native-chart-kit";
import { Dimensions, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchHistoricData } from "@/data/fetchHistoricData";
import { fetchForecast } from "@/data/fetchForecast";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fcfcfc",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#9b9b9b",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};
const colors = [
  "rgb(3, 113, 164)",
  "rgb(204, 41, 54)",
  "rgb(107, 129, 140)",
  "rgb(241, 191, 152)",
  "rgb(0, 0, 255)",
  "rgb(89, 201, 165)",
  "rgb(49, 4, 141)",
  "rgb(233, 119, 5)",
];

export function ForecastData({ location }) {
  const [forecastData, setForecastData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      if (location === null) {
        setIsLoading(true);
        return;
      }
      const fetch = await fetchForecast(location);
      if (fetch === null) {
        setIsLoading(true);
        return;
      }
      const poluents = Object.keys(fetch.polutionData[0].components);
      const datasets = poluents.map((poluent, index) => ({
        data: fetch.polutionData
          .map((data) => data.components[poluent])
          .slice(0, 4),
        strokeWidth: 1,
      }));
      datasets.forEach(
        (dataset, index) =>
          (dataset.color = (opacity = 1) =>
            `${colors[index % colors.length]} ${opacity})`)
      );
      const data = {
        datasets,
      };
      setForecastData(data);
      setIsLoading(false);
    };
    getData();
  }, [location]);

  if (isLoading === false && Object.keys(forecastData).length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      className="flex p-3 mt-4 rounded-md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.74)",
      }}
    >
      <Text className="text-lg py-3 text-black font-bold">
        Previsão da qualidade do ar
      </Text>
      {forecastData !== undefined && (
        <LineChart
          data={forecastData}
          width={screenWidth - 60}
          height={190}
          chartConfig={chartConfig}
          transparent
        />
      )}
    </View>
  );
}
