export const getBg = () => {
    const now = Date.now()
    const hours = new Date(now).getHours()
    if (hours >= 6 && hours < 18) {
        return "day"
    } else {
        return "night"
    }
}