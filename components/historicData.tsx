import { PieChart } from "react-native-chart-kit";
import { Dimensions, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchHistoricData } from "@/data/fetchHistoricData";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

export function HistoricData({ location }) {
  const [historicData, setHistoricData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchHistoricData(location);
      if (data === null) {
        return;
      }
      setHistoricData(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  if (historicData === undefined) {
    return <Text>Loading...</Text>;
  }

  if (!isLoading && historicData !== null) {
    const colors = [
      "#0371a4",
      "#CC2936",
      "#6B818C",
      "#F1BF98",
      "rgb(0, 0, 255)",
      "#59C9A5",
      "#31048d",
      "#e97705",
    ];
    const data = Object.keys(historicData.polutionData).map((key, index) => ({
      name: key.toUpperCase(), // Convert the key to uppercase for the name
      pollution: historicData.polutionData[key], // Use the value as the population
      color: colors[index % colors.length], // Cycle through colors array
      legendFontColor: "#000000", // Same legend font color as in the example
      legendFontSize: 12, // Same font size as in the example
    }));
    return (
      !isLoading && (
        <View
          className="flex p-3 mt-4 rounded-md"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.74)",
          }}
        >
          <Text className="text-lg py-3 text-black font-bold">
            Dados Historicos
          </Text>
          <Text>As últimas 24 horas da qualidade do ar</Text>
          <PieChart
            data={data}
            width={screenWidth}
            height={230}
            chartConfig={chartConfig}
            accessor={"pollution"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
          />
        </View>
      )
    );
  }
}
