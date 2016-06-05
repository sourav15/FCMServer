
module.exports = function(app) {
    app.namespace('/api/public',function(){

    app.post('/register',function(req, res){
        var userhelper = require('../helpers/user');
        userhelper.userregister(req.body, function(response){
        res.header("Access-Control-Allow-Origin", "*");
        return res.send(response);
    });
    });

    app.post('/sendpush', function(req, res) {
        var pushhelper = require('../helpers/sendpush');
        pushhelper.sendpush(req.body, function(response) {
        res.header("Access-Control-Allow-Origin", "*");
        return res.send(response);
    });
    });
    });
 };
