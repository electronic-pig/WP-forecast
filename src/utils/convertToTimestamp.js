export default function convertToTimestamp(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;//匹配预测数据
    if (regex.test(dateString)) {
        return Date.parse(dateString);
    }
    const [day, month, year, hour, minute, second] = dateString.split(/\s+|\/|:/);
    const timestamp = new Date(year, month - 1, day, hour, minute, second).getTime();
    return timestamp;
}