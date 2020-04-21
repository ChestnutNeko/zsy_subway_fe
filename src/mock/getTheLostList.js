import Mock from 'mockjs';
Mock.mock('http://123.com', {  
    //"/mock"是通过ajax获取数据时填写的地址，可以随意写。但要和ajax请求时填写的地址一致。
    'code': 0,
    'data': {
        "getTheLostList|4": [{ //生成四个如下格式的数据
            "goodsId|+1": 1, //数字从1开始，后续依次加1
            "goodsName": "@cname", //名字为随机中文名
            "goodsCity": "@city", //名字为随机城市化名
            "goodsValue|1-1000": 1, //随机金额
            "goodsLocation": "@city", //领取点
            "goodsTelephone|10000000000-19999999999": 1, //领取点电话
        }],
    },
    'message': '操作成功',
});

$.ajax({
    url: 'http://123.com',
    dataType: 'json',
    success: function(e) {
        console.log(e, "123");
    }
});