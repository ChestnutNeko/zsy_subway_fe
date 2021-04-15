/**
 * @param {*} data   [后台数据]
 * @param {*} key    [要合并的字段]
 * @param {*} target [后台数据对应的index]
 * @returns 合并的行数
 * method of 获取合并的行数
 */
export const getRowSpanCount = (data, key, target) => {
    if (!Array.isArray(data)) return 1;
    data = data.map(_ => _[key]); // 只取出筛选项
    let preValue = data[0];
    const res = [[preValue]]; // 放进二维数组里
    let index = 0; // 二维数组下标
    for (let i = 1; i < data.length; i++) {
      if (data[i] === preValue) { // 相同放进二维数组
        res[index].push(data[i]);
      } else { // 不相同二维数组下标后移
        index += 1;
        res[index] = [];
        res[index].push(data[i]);
        preValue = data[i];
      }
    }
    const arr = [];
    res.forEach((_) => {
      const len = _.length;
      for (let i = 0; i < len; i++) {
        arr.push(i === 0 ? len : 0);
      }
    });
    return arr[target];
}
/**
 * 水印
 */
export const waterMark = (userName) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.setAttribute('width', '180');
  canvas.setAttribute('height', '150');
  ctx.globalAlpha = 0.1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '20px Microsoft Yahei';
  ctx.rotate((Math.PI * 25) / 180);
  ctx.fillText(userName, 130, 50);
  let base64Url = canvas.toDataURL();
  return base64Url;
}