var FCM, async;
FCM = require('fcm-node'); 
async = require('async');

module.exports = {

              sendpush : function(incoming, callback) {

                             function validateincoming(callback) {
                                if(!incoming
                                   || incoming.pushid === "" || !incoming.pushid) {
                                   callback('Missing important data');
                                } else {
                                   callback(null);
                                }
                             } 


                            function sendpush(callback) {
                             var serverKey = '';
                             var fcm = new FCM(serverKey);
                             var message = {
                                              to: '', 
                                              
                                              data: {
                                                      your_custom_data_key: 'your_custom_data_value'
                                                    },
                                              notification: {
                                                                 title: 'Title of your push notification',
                                                                 body: 'Body of your push notification'
                                                             }         
                             };

                             fcm.send(message, function(err, response){
                             if (err) {
                                      callback(err);
                                     } else {
                                      callback(null,'success');
                                    }                       
                             });
                           }
        
                          async.waterfall([validateincoming, sendpush], function(err){
                          if(!err) {
                                    callback(JSON.stringify({'status':'success'}));
                          } else {
                                 callback(JSON.stringify({'status':'failed','message':err}));
                          }
                        });
                      }
              };         
