function GetCurrentMap1() {
    getAjax('GetCurrent', 'GET', function (res, err) {
        layer.msg(res.msg, { icon: res.code == 0 ? 1 : 2 });
        let datas = JSON.parse((res.data).replace("/\\/g", ''));
        let i = 0;
        var current_empty = 0;
        DomPosition = [];
        empty_block = 0;
        $('.Wrap').remove();
        $('.asideitem').removeClass('act');
        datas.forEach((item, indexs) => {
            DomPosition.push(item)
        })
        DomPosition.forEach((item, indexs) => {
            if (item.soName != '') {
                $('#box').append(`<div class='drag drag${item.boxName.match(/\d+(\.\d+)?/g)[0]}'>${item.soName}</div>`);
                new blockDrag({ block: "(18,18)" }, 'drag' + item.boxName.match(/\d+(\.\d+)?/g)[0]);
                $('.drag' + item.boxName.match(/\d+(\.\d+)?/g)[0] + 'Wrap').css({ 'position': 'absolute', 'top': item.pageY <= 0 ? 0 : item.pageY + 'px', 'left': item.pageX <= 0 ? 0 : item.pageX + 'px' });
                $('.aside' + item.boxName.match(/\d+(\.\d+)?/g)[0]).addClass('act');
                coordinate.push({
                    name: item.soName,
                    pageX: item.pageX,
                    pageY: item.pageY,
                    point: "(" + item.pageX + ", " + item.pageY + ")"
                })
            } else {
                empty_block++
                $('#box').append(`<div class='drag drag${empty_block}empty'></div>`);
                new blockDrag({ block: "(18,18)" }, 'drag' + empty_block + 'empty');
                $('.drag' + empty_block + 'emptyWrap').css({ 'position': 'absolute', 'top': item.pageY <= 0 ? 0 : item.pageY + 'px', 'left': item.pageX <= 0 ? 0 : item.pageX + 'px' });
                coordinate.push({
                    name: 'empty',
                    pageX: item.pageX,
                    pageY: item.pageY,
                    point: "(" + item.pageX + ", " + item.pageY + ")"
                })
            }

        })
    })
};

function GetCurrentMap2() {
    getAjax('GetCurrent2', 'GET', function (res, err) {
        layer.msg(res.msg, { icon: res.code == 0 ? 1 : 2 });
        let datas = JSON.parse((res.data).replace("/\\/g", ''));
        let i = 0;
        var current_empty = 0;
        DomPosition2 = [];
        empty_block = 0;
        $('.Wrap').remove();
        $('.asideitem').removeClass('act');
        datas.forEach((item, indexs) => {
            DomPosition2.push(item)
        })
        DomPosition2.forEach((item, indexs) => {
            if (item.soName != '') {
                $('#box').append(`<div class='drag drag${item.boxName.match(/\d+(\.\d+)?/g)[0]}'>${item.soName}</div>`);
                new blockDrag({ block: "(18,18)" }, 'drag' + item.boxName.match(/\d+(\.\d+)?/g)[0]);
                $('.drag' + item.boxName.match(/\d+(\.\d+)?/g)[0] + 'Wrap').css({ 'position': 'absolute', 'top': item.pageY <= 0 ? 0 : item.pageY + 'px', 'left': item.pageX <= 0 ? 0 : item.pageX + 'px' });
                $('.aside' + item.boxName.match(/\d+(\.\d+)?/g)[0]).addClass('act');
                coordinate.push({
                    name: item.soName,
                    pageX: item.pageX,
                    pageY: item.pageY,
                    point: "(" + item.pageX + ", " + item.pageY + ")"
                })
            } else {
                empty_block++
                $('#box').append(`<div class='drag drag${empty_block}empty'></div>`);
                new blockDrag({ block: "(18,18)" }, 'drag' + empty_block + 'empty');
                $('.drag' + empty_block + 'emptyWrap').css({ 'position': 'absolute', 'top': item.pageY <= 0 ? 0 : item.pageY + 'px', 'left': item.pageX <= 0 ? 0 : item.pageX + 'px' });
                coordinate.push({
                    name: 'empty',
                    pageX: item.pageX,
                    pageY: item.pageY,
                    point: "(" + item.pageX + ", " + item.pageY + ")"
                })
            }

        })
    })
};


//fill the block with color


function getDiagramm(data, map) {
    var areaSeq = []
    var sortedSeq = new Map()
    var sortedTime = new Map()
    var userTimeline = []
    if (map == 1) {
        for (let i = 0; i < data.length; i++) {
            areaSeq.push(data[i].fData)
        }
        for (let i = 0; i < areaSeq.length; i++) {
            //clean up areaSeq[i]
            var mapedArr = cleanUpArr(areaSeq[i].split(','))

            for (let j = 0; j < mapedArr.length; j++) {
                let tmpName = mapedArr[j].name
                let tmpTime = mapedArr[j].stay
                if (sortedSeq.has(tmpName)) {
                    var tmp_num = sortedSeq.get(tmpName)
                    sortedSeq.set(tmpName, tmp_num + 1)
                } else {
                    sortedSeq.set(tmpName, 1)
                    sortedTime.set(tmpName, 0)
                }

                // set the time of each stay
                if (tmpTime == "long") {
                    mapedArr[j].stay = 5
                } else if (tmpTime == "middle") {
                    mapedArr[j].stay = 3
                } else {
                    mapedArr[j].stay = 1
                }

            }

            for (let j = 0; j < mapedArr.length; j++) {
                if (j == 0) {
                    mapedArr[j].distance = 0
                } else {
                    mapedArr[j].distance = getDistance(mapedArr[j].name, mapedArr[j - 1].name)
                }

            }
            userTimeline.push(mapedArr)

        }

        chartTimeLine = calTimeLine(userTimeline)
        for (let [key, value] of chartTimeLine.entries()) {
            chartTimeLine.set(key, cleanMatrix(value))
        }
        //supermktTimeLine = cleanMatrix(supermktTimeLine)


        sortedSeq.forEach((value, key) => {
            const high = 5;
            const middle = 3;
            const low = 1
            if (value <= middle) {
                //green
                fillColor(key, 3)
            } else if (value < high) {
                //orange
                fillColor(key, 2)
            } else {
                //green
                fillColor(key, 1)
            }
        })

    } else {
        for (var i = 0; i < data.length; i++) {
            areaSeq.push(data[i].fData2)
        }
    }
}


//get the distance of the two block
function getDistance(name1, name2) {
    let x1, y1, x2, y2;
    let pattern = /[/\s]/g
    if(DomPosition.length != 0){
        DomPosition.forEach(item => {
            if (item.soName.replace(pattern, "") == name1) {
                x1 = item.pageX
                y1 = item.pageY
            }
            if (item.soName.replace(pattern, "") == name2) {
                x2 = item.pageX
                y2 = item.pageY
            }
        })
    } else {
        DomPosition2.forEach(item => {
            if (item.soName.replace(pattern, "") == name1) {
                x1 = item.pageX
                y1 = item.pageY
            }
            if (item.soName.replace(pattern, "") == name2) {
                x2 = item.pageX
                y2 = item.pageY
            }
        })
    }
    

    return Math.abs(x1 - x2) / 60 + Math.abs(y1 - y2) / 40

}


function calTimeLine(arr) {
    let res = new Map()
    arr.forEach(item => {
        console.log(item)
        let maxtime = 0
        for (let j = 0; j < item.length; j++) {
            let cost = 0;
            maxtime += item[j].stay + item[j].distance
            cost = maxtime - item[j].stay
            var area = item[j].name
            // push into the supermkt time line
            if (res.has(area)) {
                let tmpMatrix = res.get(area)
                let tmp = tmpMatrix.length
                tmpMatrix[tmp] = Array(maxtime).fill(0)
                for (let k = cost; k < tmpMatrix[tmp].length; k++) {
                    tmpMatrix[tmp][k] = 1
                }
                res.set(area, tmpMatrix)
            } else {
                let matrix = []
                matrix[0] = Array(maxtime).fill(0)
                for (let k = cost; k < matrix[0].length; k++) {
                    matrix[0][k] = 1
                }
                res.set(area, matrix)
            }
        }
    })

    return res
}

function cleanMatrix(m) {
    let tmpLength = 0;
    let tmpSum = []
    for (let i = 0; i < m.length; i++) {
        if (m[i].length > tmpLength) {
            tmpLength = m[i].length
        }
    }
    m.forEach(item => {
        for (let i = item.length; i < tmpLength; i++) {
            item[i] = 0
        }
        tmpSum.push(item)
    })

    let sum = new Array(tmpLength).fill(0)
    for (let k = 0; k < tmpLength; k++) {
        for (let q = 0; q < tmpSum.length; q++) {
            sum[k] = sum[k] + tmpSum[q][k]
        }
    }

    return sum
}


function cleanUpArr(arr) {
    const regex = /[^A-Za-z]/g;
    let cleanedArr = []
    let tmpArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            tmpArr.push(arr[i].replace(regex, ""))
        }
    }
    if (tmpArr.length % 2 == 0) {
        for (let i = 0; i < tmpArr.length; i = i + 2) {
            cleanedArr.push({
                "name": tmpArr[i],
                "stay": tmpArr[i + 1]
            })
        }
    }
    return cleanedArr
}


function fillColor(block_name, status_code) {
    var empty_neighbor = [], point_x, point_y;
    coordinate.forEach((item, block) => {
        if (item.name == block_name) {
            point_x = item.pageX
            point_y = item.pageY
            empty_neighbor[0] = [item.pageX - 60, item.pageY]
            empty_neighbor[1] = [item.pageX + 60, item.pageY]
            empty_neighbor[2] = [item.pageX, item.pageY - 40]
            empty_neighbor[3] = [item.pageX, item.pageY + 40]

        }

    })

    coordinate.forEach((item, block) => {
        for (let i = 0; i < empty_neighbor.length; i++) {
            if (empty_neighbor[i][0] == item.pageX && empty_neighbor[i][1] == item.pageY) {
                empty_neighbor.splice(i, 1)
            }
        }
    })

    for (let i = 0; i < empty_neighbor.length; i++) {
        if (empty_neighbor[i][0] >= 0 && empty_neighbor[i][0] <= 1020 && empty_neighbor[i][1] >= 0 && empty_neighbor[i][1] <= 680) {
            block_name = block_name.replace(/\s+/g, "")
            $('#box').append(`<div class='status${block_name}${i}'></div>`);
            $('.status' + block_name + i).css({ 'width': 60, 'height': 40, 'position': 'absolute', 'left': empty_neighbor[i][0] + 'px', 'top': empty_neighbor[i][1] + 'px' });

        }
        //orange
        if (status_code == 2) {
            //orange
            $('.status' + block_name + i).css({ 'background': 'rgb(217, 135, 59)' });
        } else if (status_code == 3) {
            //green
            $('.status' + block_name + i).css({ 'background': 'rgb(101, 217, 59)' });
        } else {
            //red
            $('.status' + block_name + i).css({ 'background': 'rgb(209, 50, 50)' });
        }
    }


}


function getCharts() {
    var myChart = echarts.init(document.getElementById('mychart'));
    option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            interval: 1,
            min: 0,
            max: 36
        },
        yAxis: {
            type: 'value',
            interval: 1,
            min: 0,
            max: 5
        },
        series: [
            {
                name: 'Map2',
                type: 'bar',
                step: 'Map1',
                data: chartTimeLine.get("Fruit")
            }
        ]
    };

    myChart.setOption(option);
}