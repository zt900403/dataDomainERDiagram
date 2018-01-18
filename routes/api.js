/**
 * Created by zhang on 18/01/10.
 */
var express = require('express');
var router = express.Router();

// var domainInfo = require('../demodata/123');
var domainInfo = require('../lib/domainInfo');
/* GET home page. */
var domainHeader = {
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
    edgeSymbol: ['circle'],
    edgeSymbolSize: [10, 20],
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
            }
        }
    }
};
var tableHeader = {
    type: 'graph',
    layout: 'force',
    force: {
        repulsion: 500,
        gravity: 0.1,
        edgeLength: 100,
        layoutAnimation: true,
    },
    roam: true,
    lineStyle: {
        normal: {
            width: 6,
            color: 'source',
            curveness: 0,
            type: "solid"
        }
    }
};
router.get('/domainInfo', function (req, res, next) {
    domainInfo.getDomainInfo(function (err, data) {
        if (!err) {
            var array = [];
            data.rows.forEach(function (e) {
                array.push({
                    name: e.db_desc,
                    db_name: e.db_name
                })
            });
            delete domainHeader.data;
            domainHeader.data = array;
            res.json(domainHeader);

        }
    });
    // res.json(domainInfo);
});

router.get('/subdomainInfo', function (req, res, next) {
    domainInfo.getSubDomainInfo(req.query.subdomainname, function (err, data) {
        if (!err) {
            var array = [];
            data.rows.forEach(function (e) {
                array.push({
                    name: e.sub_field_name,
                    sub_field_id: e.sub_field_id
                })
            });
            delete domainHeader.data;
            domainHeader.data = array;
            res.json(domainHeader);

        }
    });
});

router.get('/tables', function (req, res, next) {
    domainInfo.getTables(req.query.sub_field_id, function (err, data) {
        if (!err) {
            var array = [];
            var duplicate_check = {};
            data.rows.forEach(function (e) {
                var name = e.table_desc ? e.table_desc : e.table_name;
                if (!duplicate_check.hasOwnProperty(name)) {
                    duplicate_check[name] = 1;
                } else {
                    name = name + duplicate_check[name];
                    duplicate_check[name]++;
                }
                array.push({
                    name: name,
                    table_name: e.table_name,
                    draggable: true
                });
            });
            delete tableHeader.data;
            tableHeader.data = array;
            res.json(tableHeader);
        }
    });
});

router.get('/tableMetadata', function (req, res, next) {
   domainInfo.getTableMetadata(req.query.tablename, function(err, data) {
      if (!err) {
          var result = '';
          var index = 1;
          data.rows.forEach(function(e) {
              result += '<tr>' +
                        '<th scope="row">' + (index++) + '</th>' +
                        '<td>' + e.column_name + '</td>' +
                        '<td>' + e.column_desc + '</td>' +
                        '<td>' + e.column_data_type +'</td>' +
                        '</tr>';
          });
          res.send(200, result);
      }
   });
});
module.exports = router;