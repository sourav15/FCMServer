var mysql, async;
mysql = require('../core/mysql');
async = require('async');

module.exports = {

              userregister : function(incoming, callback) {
                            
                             function validateincoming(callback) {
                                if(!incoming || !incoming.mobile || !incoming.password
                                   || incoming.mobile === "" || incoming.password === ""
                                   || incoming.pushid === "" || !incoming.pushid) {
                                   callback('Missing important data');
                                } else {
                                   callback(null);
                                }
                             } 

                             function insertintomysql(callback) {
                                var params, query;
                                params = [incoming.mobile, incoming.password, incoming.pushid];
                                query = "INSERT INTO users(mobile, password, pushid) VALUES(?, ?, ?)"; 
                                mysql.query(query, params, function(err, res){
                                if(!err && (res != null) && (res.insertId != null)){
                                   insertid = res.insertId;
                                   callback(err, insertid);
                                } else {
                                    callback(err);
                                }    
                                });
 
                             }

                             async.waterfall([validateincoming, insertintomysql], function(err, insertid){
                             if(!err){
                                callback(JSON.stringify({"status": "success", "data":insertid}));
                             } else {
                                 callback(JSON.stringify({"status": "failed", "message": err}));
                             }
                             });

              }

};
