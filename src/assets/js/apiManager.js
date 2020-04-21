import cookie from 'react-cookies';

if(process.env.NODE_ENV === 'develement') {
    require('../../mock/getTheLostList');
}

let token = cookie.load('token');
let postApi = (path, mock) => {
    return path + (mock ? '' : '.mock') + '?token=' + token;
}

export default {
    'getTheLostList': postApi('/getTheLostList', 0),
}