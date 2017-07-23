import originJSONP from 'jsonp'

export default function jsonp(url, data, option){
    /**
     * url是请求地址;
     data是url后面的其他标识符
     option是传入的参数
    **/
    url += (url.indexOf('?')<0 ? '?' : '&' ) + param(data);
    // url如果有?则后面跟&如果灭有问号后面更?
    return new Promise((resolve, reject) =>{
        originJSONP(url, option, (err, data) =>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

export function param(data){
    let url = '';
    for(var key in data){
        // key代表的是下标
        let value = data[key] !== undefined ? data[key] : '';
        // url += `&${key}=${encodeURLComponent(value)}`
        url += '&' + key + '=' + encodeURIComponent(value)
        // encodeURLComponent用于把字符串当作URL进行转义编码
    }

    return url ? url.substring(1) : ''
}