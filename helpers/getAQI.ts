export const getAQIColor = (aqi: number) => {
    switch (aqi) {
        case 1:
            return "#046C4E"
        case 2:
            return "#E3A008"
        case 3:
            return "fb8500"
        case 4:
            return "#E02424"
        case 5:
            return "#5521B5"
    }


}
export const getAQIName = (aqi: number) => {
    switch (aqi) {
        case 1:
            return "Good"
        case 2:
            return "Fair"
        case 3: 
            return "Moderate"
        case 4:
            return "Poor"
        case 5:
            return "Very Poor"
    }
}


export const getPoluentColors = ({poluent, v}) => {
    const table = {
        "so2" : [
            {value: 20, color: "#046C4E"},
            {value: 80, color: "#E3A008"},
            {value: 250, color: "#fb8500"},
            {value: 350, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "pm10" : [
            {value: 20, color: "#046C4E"},
            {value: 50, color: "#E3A008"},
            {value: 100, color: "#fb8500"},
            {value: 200, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "pm2_5" : [
            {value: 10, color: "#046C4E"},
            {value: 25, color: "#E3A008"},
            {value: 50, color: "#fb8500"},
            {value: 75, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "co" : [
            {value: 4400, color: "#046C4E"},
            {value: 9400, color: "#E3A008"},
            {value: 12400, color: "#fb8500"},
            {value: 15400, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "o3" : [
            {value: 60, color: "#046C4E"},
            {value: 100, color: "#E3A008"},
            {value: 140, color: "#fb8500"},
            {value: 180, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "no" : [
            {value: 40, color: "#046C4E"},
            {value: 70, color: "#E3A008"},
            {value: 150, color: "#fb8500"},
            {value: 200, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "no2" : [
            {value: 40, color: "#046C4E"},
            {value: 70, color: "#E3A008"},
            {value: 150, color: "#fb8500"},
            {value: 200, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ],
        "nh3" : [
            {value: 40, color: "#046C4E"},
            {value: 70, color: "#E3A008"},
            {value: 150, color: "#fb8500"},
            {value: 200, color: "#E02424"},
            {value: Infinity, color: "#5521B5"}
        ]
    }
    const data = table[poluent]
    for (const { value, color } of data) {
        if (v <= value) {
          return color;
        }
    }
    
}