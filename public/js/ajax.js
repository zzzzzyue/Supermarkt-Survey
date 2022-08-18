function postAjax(url,type,data,callback){
    console.log(data)
    $.ajax({
        url: url,
        type: type, 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: data,
        success: function (res) {
            callback(res)
            // layer.msg(res.msg, { icon: res.code == 200 ? 1 : 2 })
        },
        error: function (err) {
            callback({code:500,data:[],msg:'Error'})
        }
    })
}
function getAjax(url,type,callback){
    $.ajax({
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
            callback(res)
            // layer.msg(res.msg, { icon: res.code == 200 ? 1 : 2 })
        },
        error: function (err) {
            console.log(err)
            callback({code:500,data:[],msg:'Error'})
        }
    })
}