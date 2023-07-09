export default function convertToTimestamp(dateString) {
    const [day, month, year, hour, minute, second] = dateString.split(/\s+|\/|:/);
    const timestamp = new Date(year, month - 1, day, hour, minute, second).getTime();
    return timestamp;
}