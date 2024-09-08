import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { getBg } from "@/helpers/getBg";
import RNPickerSelect from "react-native-picker-select";

export default function Calcuate() {
  const [bg, setBg] = useState("");
  const [km, setKm] = useState("");
  const [veiculo, setVeiculo] = useState();
  const [calc, setCalc] = useState(0);

  useEffect(() => {
    setBg(getBg());
  }, []);

  const handleCalculate = (km, car) => {
    if (car === "carp") {
      setCalc((km / 10) * 0.83 * 3.7 * 0.75);
    } else if (car === "onib") {
      setCalc(((km / 3) * 0.83 * 3.7) / 30);
    } else if (car === "moto") {
      setCalc((km / 30) * 0.83 * 3.7 * 0.75);
    }
  };
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
        <View className="flex mx-4 pb-8 ">
          <View className="flex flex-col justify-between">
            <Text
              className={`text-lg mt-5 ${
                bg === "night" ? "text-white font-semibold" : "text-black"
              }`}
            >
              Calcule quanta emissão você produz no seu trajeto diario.
            </Text>
            <Text
              className={`mt-5 ${
                bg === "night" ? "text-white font-semibold" : "text-black"
              }`}
            >
              Qual média de Kms você anda por dia
            </Text>
            <TextInput
              className={`mt-5 ${
                bg === "night" ? "text-white font-semibold" : "text-black"
              }`}
              onChangeText={setKm}
              value={km}
            />
            <Text
              className={`mt-5 ${
                bg === "night" ? "text-white font-semibold" : "text-black"
              }`}
            >
              Qual meio de transporte você mais utiliza?
            </Text>
            <RNPickerSelect
              style={{
                inputAndroid: {
                  color: bg === "night" ? "#FFFF" : "#0000",
                },
              }}
              onValueChange={(value) => setVeiculo(value)}
              items={[
                { label: "Carro de passeio 10Km/L", value: "carp" },
                { label: "Onibus", value: "onib" },
                { label: "Moto 30Km/L", value: "moto" },
              ]}
            />
            <Button
              title="Calcular"
              onPress={() => handleCalculate(km, veiculo)}
            ></Button>
            {calc > 0 && (
              <>
                <Text
                  className={`mt-5 text-lg text-center ${
                    bg === "night" ? "text-white font-semibold" : "text-black"
                  }`}
                >
                  Você gasta em media nesse trajeto:
                </Text>
                <Text
                  className={`mt-5 text-xl text-center ${
                    bg === "night" ? "text-white font-semibold" : "text-black"
                  }`}
                >
                  {Math.round(calc)} kg/C02
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
