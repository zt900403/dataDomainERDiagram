/**
 * Created by zhang on 17/12/29.
 */
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
    },
    series: [
        {
            type: 'graph',
            tooltip: {},
            ribbonType: true,
            layout: 'circular',
            circular: {
                rotateLabel: true
            },
            symbolSize: 60,
            roam: true,
            focusNodeAdjacency: true,
            /*
             label: {
             normal: {
             position: 'center',
             fontWeight: 'bold',
             formatter: '{b}',
             normal: {
             textStyle: {
             fontFamily: '宋体'
             }
             }
             }
             },
             */
            edgeSymbol: ['circle'],
            edgeSymbolSize: [10, 20],
            /*
             edgeLabel: {
             normal: {
             textStyle: {
             fontSize: 13,
             fontWeight: 'bold',
             fontFamily: '宋体'
             }
             }
             },
             */
            itemStyle: {
                normal: {
                    label: {
                        rotate: true,
                        show: true,
                        textStyle: {
                            fontWeight: 'bold'
                        }
                    },
                },
                emphasis: {
                    label: {
                        show: true
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    }
                }
            },
            data: [{
                name: 'MSS域',

            }, {
                name: 'BSS域',

            }, {
                name: '参与人域',
            }, {
                name: '财务',
            }, {
                name: 'OSS'
            }],
            // links: [],
            links: [{
                source: 'OSS',
                target: 'BSS域',
                label: {
                    normal: {
                        formatter: function (params, ticket, callback) {
                            params.name = params.data.name;
                            return params.name;
                        },
                        show: true
                    }
                },
                lineStyle: {
                    normal: {
                        width: 4,
                        curveness: 0.2,
                        color: '#fcae00'
                    }
                }
            },
                {
                    source: 'OSS',
                    target: 'MSS域',
                    label: {
                        normal: {
                            formatter: function (params, ticket, callback) {
                                params.name = params.data.name;
                                return params.name;
                            },
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            curveness: 0.2,
                            color: '#fcae00'
                        }
                    }
                },
                {
                    source: 'OSS',
                    target: '财务',
                    label: {
                        normal: {
                            formatter: function (params, ticket, callback) {
                                params.name = params.data.name;
                                return params.name;
                            },
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            curveness: 0.2,
                            color: '#fcae00'
                        }
                    }
                },
                {
                    source: '参与人域',
                    target: 'BSS域',
                    label: {
                        normal: {
                            formatter: function (params, ticket, callback) {
                                params.name = params.data.name;
                                return params.name;
                            },
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            curveness: 0.2,
                            color: '#fcae00'
                        }
                    }
                },
                {
                    source: '参与人域',
                    target: '财务',
                    label: {
                        normal: {
                            formatter: function (params, ticket, callback) {
                                params.name = params.data.name;
                                return params.name;
                            },
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            curveness: 0.2,
                            color: '#fcae00'
                        }
                    }
                },
                {
                    source: '参与人域',
                    target: 'MSS域',
                    label: {
                        normal: {
                            formatter: function (params, ticket, callback) {
                                params.name = params.data.name;
                                return params.name;
                            },
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            curveness: 0.2,
                            color: '#fcae00'
                        }
                    }
                },
            ]
        }
    ]
};
