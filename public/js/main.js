var myChart;
(function () {
    function resizeDIV() {
        var w = $(window).width();
        var h = $(window).height();
        $('#main').width(w)
            .height(h);
    }

    $(document).ready(function () {
        function screenBack() {
            if (optionStack.length >= 2) {
                optionStack.pop();
                myChart.clear();
                myChart.setOption(optionStack[optionStack.length - 1]);
            }
        };
        var optionStack = [];
        resizeDIV();
        var chartBaseOption = {
            animationDuration: 3000,
            animationDurationUpdate: 2500,
            animationEasingUpdate: 'quinticInOut',
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#f7f8fa'
            }, {
                offset: 1,
                color: '#cdd0d5'
            }]),
            title: {
                text: "数据中心汇聚各域数据情况",
                subtext: "power by 数据中心",
                top: "top",
                left: "left",
                textStyle: {
                    color: '#000'
                }
            }
        };
        var tablesOption = {
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#f7f8fa'
            }, {
                offset: 1,
                color: '#cdd0d5'
            }]),
            title: {
                subtext: "power by 数据中心",
                text: "MSS域",
                top: "top",
                left: "left"
            },
            tooltip: {},
            toolbox: {
                show: true,
                feature: {
                    myTool: {
                        show: true,
                        title: '返回大域',
                        icon: 'path://M853.333333 0 853.333333 1024 170.666667 512Z',
                        onclick: function () {
                            myChart.clear();
                            $.get("api/domainInfo")
                                .done(function (data) {
                                    chartBaseOption.series = data;
                                    myChart.setOption(chartBaseOption);
                                })
                                .fail(function (data) {
                                    alert("get domain info failed!");
                                });
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }

                }
            },
            animationDuration: 3000,
            animationEasingUpdate: 'quinticInOut'
        };
        var toolbox = {
            show: true,
            feature: {
                myTool: {
                    show: true,
                    title: '返回大域',
                    icon: 'path://M853.333333 0 853.333333 1024 170.666667 512Z',
                    onclick: screenBack
                    /*function () {
                     myChart.clear();
                     $.get("api/domainInfo")
                     .done(function (data) {
                     chartBaseOption.series = data;
                     myChart.setOption(chartBaseOption);
                     })
                     .fail(function (data) {
                     alert("get domain info failed!");
                     });
                     } */
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }

            }
        };
        myChart = echarts.init(document.getElementById('main'), 'macarons');
        // var option = chartBaseOption;
        $.get("api/domainInfo")
            .done(function (data) {
                var option = Object.assign({}, chartBaseOption);
                option.series = data;
                myChart.setOption(option);
                optionStack.push(option);
            })
            .fail(function (data) {
                alert("get domain info failed!");
            });
        // myChart.setOption(option);

        window.onresize = function () {
            resizeDIV();
            myChart.resize();
        };


        myChart.on('click', function (param) {
            if (param.data.db_name) {
                $.get('api/subdomainInfo', {subdomainname: param.data.db_name.split('_')[0]})
                    .done(function (data) {
                        var option = JSON.parse(JSON.stringify(chartBaseOption));
                        option.series = data;
                        option.title.text = param.data.name + '大域';
                        option.toolbox = toolbox;
                        myChart.setOption(option);
                        myChart.dispatchAction({
                            type: 'restore'
                        });
                        optionStack.push(option);
                    })
                    .fail(function () {
                        alert('get sub domain info failed!');
                    });
            }
            if (param.data.sub_field_id) {
                $.get('api/tables', {sub_field_id: param.data.sub_field_id})
                    .done(function (data) {
                        var option = Object.assign({}, tablesOption);
                        option.series = data;
                        option.title.text = param.data.name + '子域';
                        myChart.setOption(option);
                        myChart.dispatchAction({
                            type: 'restore'
                        });
                        optionStack.push(option);
                    })
                    .fail(function () {
                        alert('get tables failed!');
                    });
            }

            if (param.data.table_name) {

                var $div = $('<div></div>');
                var $table = $('<table class="table table-striped modal-body">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">#</th>' +
                    '<th scope="col">列名</th>' +
                    '<th scope="col">列描述</th>' +
                    '<th scope="col">列数据类型</th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>');
                var $tbody = $('<tbody></tbody>');

                $.get('api/tableMetadata', {tablename: param.data.table_name})
                    .done(function (data) {
                        // tablesOption.series = data;
                        // myChart.setOption(tablesOption);
                        // myChart.dispatchAction({
                        //     type: 'restore'
                        // });
                        $tbody.append(data);
                    })
                    .fail(function () {
                        alert('get tableMetadata failed!');
                    });


                $table.append($tbody);
                $div.append($table);
                BootstrapDialog.show({
                    title: param.data.name + '表定义',
                    message: $div,
                    buttons: [{
                        label: '关闭',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            }
        });
    });
}());
