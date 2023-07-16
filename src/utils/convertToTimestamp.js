export default function convertToTimestamp(dateString) {
    const regex1 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;//匹配预测数据
    const regex2 = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;
    const regex3 = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    console.log(dateString);
    if (regex1.test(dateString)) {
        return Date.parse(dateString);
    }
    if (regex2.test(dateString)) {
        const [day, month, year, hour, minute, second] = dateString.split(/\s+|\/|:/);
        const timestamp = new Date(year, month - 1, day, hour, minute, second).getTime();
        return timestamp;   
    }
    if (regex3.test(dateString)) {
        const timestamp = new Date(dateString).getTime();
        return timestamp;
    }
}