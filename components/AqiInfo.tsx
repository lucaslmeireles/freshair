import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export function AqiInfo() {
  const aqi_info = {
    "PM 2.5":
      "A PM2.5 ou particulas menores que 2.5 microms são as particulas suspensas no ar. Os principais efeitos provocados à saúde pelo PM 2,5, notadamente nos sistemas respiratório, circulatório e reprodutor. No sistema respiratório, os danos mais importantes são desencadeamento ou agravamento de inflamações pulmonares, asma, doença pulmonar obstrutiva crônica e câncer. Os principais eventos cardiovasculares são alterações no ritmo cardíaco, isquemia miocárdica, modificações na coagulação sanguínea e progressão da aterosclerose.",
    "PM 10":
      "A PM10 ou particulas menores que 10 microms são as particulas suspensas no ar. Para as partículas mais finas os efeitos estão predominantemente relacionados aos sistemas respiratórios e cardiovasculares e a sensibilidade está associada às condições individuais de saúde e faixa etária, embora toda a população seja afetada. De acordo com a OMS, não existem evidências suficientes que indiquem um limite abaixo do qual não ocorram efeitos à saúde humana.",
    CO: "O monóxido de carbono é um gás incolor e inodoro que é liberado na queima de combustíveis fósseis. Combina-se rapidamente com a hemoglobina ocupando o lugar do oxigêncio, podendo levar a morte por asfixia. A exposição crônica pode causar prejuízos ao sistema nervoso central, cardiovascular, pulmonar e outros. Também pode afetar fetos causando peso reduzido no nascimento e desenvolvimento pós-natal retardado.",
    SO2: "O dióxido de enxofre é um gás incolor e inodoro que é liberado na queima de combustíveis fósseis.  Em concentrações progressivamente maiores, causam o aumento da secreção mucosa nas vias respiratórias superiores, inflamações graves da mucosa e redução do movimento ciliar do trato respiratório. Pode, ainda, aumentar a incidência de rinite, faringite e bronquite.",
    NO2: "O dióxido de nitrogênio é um gás incolor e inodoro que é liberado na queima de combustíveis fósseis. Pode levar a formação da chuva ácida e consequentemente danos à vegetação e agricultura. Além disso, contribui para formação do ozônio na troposfera; para o aquecimento global; formação de compostos quimiotóxicos e alteração da visibilidade.",
    O3: "O ozônio é um gás incolor e inodoro que é liberado na queima de combustíveis fósseis. Provoca danos na estrutura pulmonar, reduzindo sua capacidade e diminuindo a resistência às infecções. Causa ainda, o agravamento de doenças respiratórias, aumentando a incidência de tosse, asma, irritações no trato respiratório superior e nos olhos.",
  };
  const [currentDataKey, setCurrentDataKey] = useState("PM 2.5");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const keys = Object.keys(aqi_info);
      const nextIndex = (keys.indexOf(currentDataKey) + 1) % keys.length;
      setCurrentDataKey(keys[nextIndex]);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [currentDataKey]);
  return (
    <View
      className="flex p-3 mt-4 rounded-md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.74)",
      }}
    >
      <Text className="font-semibold text-lg  px-2">
        Informações da Qualidade do Ar
      </Text>
      <Text className="font-normal  py-2 px-3">
        Você sabe como cada particula influencia o ar?
      </Text>
      <View className="p-3 mx-3 gap-2">
        <Text className="text-lg font-semibold">{currentDataKey}</Text>
        <Text>{aqi_info[currentDataKey]}</Text>
        <Text className="text-xs">
          Fontes: Poluição atmosférica e efeitos respiratórios, cardiovasculares
          e reprodutivos na saúde humana - RMMG Fernandes,Juliana;2009 Qualidade
          do Ar - IAMA Estado do Espírito Santo
        </Text>
      </View>
    </View>
  );
}
