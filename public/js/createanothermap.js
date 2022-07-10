var this_em = '', per_em = '', DomPosition = [],
    DomArr = [];
getClassList(0);
//apend the class list to the aside ul
function getClassList(n) {
    getAjax('/classListAll', 'GET', function (res, err) {
        DomArr = [];
        if (n == 1) {
            layer.msg(res.code == 0 ? 'Update successful' : 'Update failed', { icon: res.code == 0 ? 1 : 2 });
        }
        if (res.code == 0) {

            $('.aside ul').empty();
            DomArr = res.data;
            (res.data).forEach((item, index) => {
                $('.aside ul').append(`
                            <li data-name="${item.className}" data-id="${index}" class="asideitem aside${index}">${item.className}</li>
                        `)
            });
        }
    })
};
$('.update').on('click', function () {
    layer.confirm('Do you want to update the areas？', {
        btn: ['Yes', 'No']
    }, function (index, layero) {
        getClassList(1);
    }, function (index) {
        layer.msg('Cancel', { icon: 5 });
    });
})

//reset block
var DrageArr = new blockDrag({ block: "(18,18)" }, 'drag99999');
//set the blockNum ！！！！(18*18 as planed)
var blockNum = Number(DrageArr.col) * Number(DrageArr.row);
console.log(blockNum);
for (var i = 0; i < blockNum; i++) {
    $("<div class='block' style='width:" + DrageArr.set.blockW + "px;height:" + DrageArr.set.blockH + "px'></div>").appendTo($("#box"));
};

// add box
$('.aside ul').on('click', 'li', function () {
    if ($(this).attr('class').indexOf('act') >= 0) {
        let boxName = '.drag' + $(this).attr('data-id') + 'Wrap', delIndex = null;
        DomPosition.forEach((element, index) => { element.boxName === boxName ? delIndex = index : null });
        DomPosition.splice(delIndex, 1);
        $(boxName).remove();
        $(this).removeClass('act');
    } else {
        $(this).addClass('act');
        $('#box').append(`<div class='drag drag${$(this).attr('data-id')}'>${$(this).attr('data-name')}</div>`);
        new blockDrag({ block: "(18,18)" }, 'drag' + $(this).attr('data-id'));
        DomPosition.push({
            id: DomPosition.length,
            asideName: '.' + $(this).attr('class'),
            boxName: '.drag' + $(this).attr('data-id') + 'Wrap',
            soName: $(this).attr('data-name'),
            pageX: 0,
            pageY: 0
        })
    }
});
//prevent deault Listener 
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});
$('body').on('mousedown', function (e) {
    $('.alert').css('display', 'none')
    this_em = '';
    e.stopPropagation();
});
layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;
    form.render()
    // delete
    $('.alert').on('mousedown', function (e) {
        if (e.which == 1) {
            $('.alert').css('display', 'none');
            $(DomPosition[this_em].boxName).remove();
            $('.' + DomPosition[this_em].asideName.split('.asideitem')[1].split('act')[0].trim()).removeClass('act');
            DomPosition.splice(this_em, 1)
            $(per_em).removeClass('act');
        }
        e.stopPropagation();
    });

    // reset
    $('.de').on('click', function () {
        layer.confirm('Do you want to reset the areas?', {
            btn: ['Yes', 'No']
        }, function (index, layero) {
            DomPosition = [];
            $('.Wrap').remove();
            $('.asideitem').removeClass('act');
            layer.msg('Reset successful', { icon: 1 });
        }, function (index) {
            layer.msg('Cancel', { icon: 5 });
        });
    });

    // revert
    var datas = [{ "id": 0, "asideName": ".asideitem aside1 act", "boxName": ".drag1Wrap", "soName": "1", "pageX": 0, "pageY": 0 }, { "id": 1, "asideName": ".asideitem aside2 act", "boxName": ".drag2Wrap", "soName": "2", "pageX": 300, "pageY": 200 }, { "id": 3, "asideName": ".asideitem aside6 act", "boxName": ".drag6Wrap", "soName": "3", "pageX": 0, "pageY": 200 }, { "id": 3, "asideName": ".asideitem aside3 act", "boxName": ".drag3Wrap", "soName": "4", "pageX": 300, "pageY": 0 }, { "id": 4, "asideName": ".asideitem aside9 act", "boxName": ".drag9Wrap", "soName": "5", "pageX": 150, "pageY": 100 }]
    $('.default').on('click', function () {
        layer.confirm('do you want to revert the areas？', {
            btn: ['Yes', 'No']
        }, function (index, layero) {
            getAjax('GetCurrent', 'GET', function (res, err) {
                layer.msg(res.msg, { icon: res.code == 0 ? 1 : 2 });
                let datas = JSON.parse((res.data).replace("/\\/g", ''));
                let i = 0;
                DomPosition = [];
                $('.Wrap').remove();
                $('.asideitem').removeClass('act');
                DomPosition = datas;
                DomPosition.forEach((item, indexs) => {
                    $('#box').append(`<div class='drag drag${item.boxName.match(/\d+(\.\d+)?/g)[0]}'>${item.soName}</div>`);
                    new blockDrag({ block: "(18,18)" }, 'drag' + item.boxName.match(/\d+(\.\d+)?/g)[0]);
                    $('.drag' + item.boxName.match(/\d+(\.\d+)?/g)[0] + 'Wrap').css({ 'position': 'absolute', 'top': item.pageY <= 0 ? 0 : item.pageY + 'px', 'left': item.pageX <= 0 ? 0 : item.pageX + 'px' });
                    $('.aside' + item.boxName.match(/\d+(\.\d+)?/g)[0]).addClass('act');
                })
            })

            // layer.msg('revert successful', { icon: 1 });
        }, function (index) {
            layer.msg('cancel', { icon: 5 });
        });
    });

    $('.pre').on('click', function () {
        postAjax('insertPosition2', 'POST', { data: JSON.stringify(DomPosition) }, function (res, err) {
            layer.msg(res.msg, { icon: res.code == 200 ? 1 : 2 });
        })
    })
});