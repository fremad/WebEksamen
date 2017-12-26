var mongoose = require('mongoose');
var wor = mongoose.model('Workout');
var utils = require('../DAL/utility');
var dbacces = require('../DAL/db/dbacces');

module.exports.addExercise = function (req, res) {

    //Check for workoutid
    if (!(req.params && req.params.workoutid)) {
        utils.sendJSONresponse(res, 404, { "message": "No workoutid in request" });
    }
    dbacces.addExercise(req.params.workoutid, req.body).then((data) => {
        if (!data) {
            utils.sendJSONresponse(res, 404, { "message": "No data found" })
        }
        utils.sendJSONresponse(res, 201, data);
    }).catch(err => {
        utils.sendJSONresponse(res, 404, err.message)
    });
}