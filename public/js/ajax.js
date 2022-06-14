function postAjax(url,type,data,callback){
    $.ajax({
        url: 'http://127.0.0.1:3000/'+url,
        type: type, 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: data,
        success: function (res) {
            callback(res)
            // layer.msg(res.msg, { icon: res.code == 200 ? 1 : 2 })
        },
        error: function (err) {
            console.log(err)
            callback({code:500,data:[],msg:'错误'})
        }
    })
}
function getAjax(url,type,callback){
    $.ajax({
        url: 'http://127.0.0.1:3000/'+url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
            callback(res)
            // layer.msg(res.msg, { icon: res.code == 200 ? 1 : 2 })
        },
        error: function (err) {
            console.log(err)
            callback({code:500,data:[],msg:'错误'})
        }
    })
}