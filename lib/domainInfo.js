/**
 * Created by zhang on 18/01/16.
 */
var pool = require('./db');


var obj = {};
obj.getDomainInfo = function (fn) {
    pool.query('SELECT DISTINCT(db_name),db_desc FROM sch_rpt.dim_db_info;', function (err, data) {
        fn(err, data);
    });
};

obj.getSubDomainInfo = function (name, fn) {
    pool.query({
        text: 'SELECT sub_field_id, sub_field_name FROM sch_rpt.dim_field WHERE field_name=$1;',
        values: [name]
    }, function (err, data) {
        fn(err, data);
    });
};

obj.getTables = function (sub_field_id, fn) {
    pool.query({
        text: 'SELECT table_name, table_desc FROM sch_rpt.data_menu_tables WHERE sub_field=$1;',
        values: [sub_field_id]
    }, function (err, data) {
        fn(err, data);
    });
};

obj.getTableMetadata = function(tablename, fn) {
    pool.query({
        text: 'select column_name, column_desc, column_data_type \
                from sch_rpt.data_menu_table_columns \
                where table_name=$1;',
        values: [tablename]
    }, function (err, data) {
        fn(err, data);
    });

};
module.exports = obj;
