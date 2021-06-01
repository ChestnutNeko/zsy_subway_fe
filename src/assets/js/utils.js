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

/**
 * 数字千分位格式化
 * @public
 * @param mixed mVal 数值
 * @return string
 */
 export const formatMoney = mVal => {
  if(!mVal){
    return '0'
  }
  var fTmp = 0.0; //临时变量
  var iFra = 0; //小数部分
  var iInt = 0; //整数部分
  var aBuf = new Array(); //输出缓存
  var bPositive = true; //保存正负值标记(true:正数)
  /**
   * 输出定长字符串，不够补0
   * <li>闭包函数<[表情]>
   * @param int iVal 值
   * @param int iLen 输出的长度
   */
  function funZero(iVal, iLen) {
    var sTmp = iVal.toString();
    var sBuf = new Array();
    for (var i = 0, iLoop = iLen - sTmp.length; i < iLoop; i++) sBuf.push("0");
    sBuf.push(sTmp);
    return sBuf.join("");
  }
  bPositive = mVal >= 0; //取出正负号
  fTmp = isNaN((fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp); //[表情]制转换为绝对值数浮点
  //所有内容用正数规则处理
  iInt = parseInt(fTmp); //分离整数部分
  if (!((fTmp + "").indexOf(".") === -1)) {
    iFra = (fTmp + "").split(".")[1];
  }
  do {
    aBuf.unshift(funZero(iInt % 1000, 3));
  } while ((iInt = parseInt(iInt / 1000)));
  aBuf[0] = parseInt(aBuf[0]).toString(); //最高段区去掉前导0
  // 判断是否有小数位
  if (iFra) {
    return (bPositive ? "" : "-") + aBuf.join(",") + "." + iFra;
  } else {
    return (bPositive ? "" : "-") + aBuf.join(",");
  }
};