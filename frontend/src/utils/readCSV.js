export default function readCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const rows = reader.result.split('\n');
      const data = [];

      // 忽略第一行标题内容
      for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        data.push(columns);
      }

      resolve(data);
    };

    reader.onerror = () => {
      reject(new Error('无法读取文件'));
    };

    reader.readAsText(file);
  });
}
