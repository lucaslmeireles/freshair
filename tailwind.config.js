/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        example: [
          "Inter_100Thin",
          "Inter_200ExtraLight",
          "Inter_300Light",
          "Inter_400Regular",
          "Inter_500Medium",
          "Inter_600SemiBold",
          "Inter_700Bold",
          "Inter_800ExtraBold",
          "Inter_900Black,",
        ],
      },
      backgroundImage: {
        main: "url('/assets/images/main.jpg')",
      },
    },
  },
  plugins: [],
};
