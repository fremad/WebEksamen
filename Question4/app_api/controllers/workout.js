var mongoose = require('mongoose');
var wor = mongoose.model('Workout');
var utils = require('../DAL/utility');
var dbacces = require('../DAL/db/dbacces');


module.exports.getWorkoutById = function (req, res) {

    //Check for workoutid
    if (!(req.params && req.params.workoutid)) {
        utils.sendJSONresponse(res, 404, { "message": "No workoutid in request" });
    }

    dbacces.getWorkoutById(req.params.workoutid).then((data) => {
        if (!data) {
            utils.sendJSONresponse(res, 404, { "message": "No data found" })
        }
        utils.sendJSONresponse(res, 200, data);
    }).catch(err => {
        utils.sendJSONresponse(res, 404, err.message)
    });
};

module.exports.getAllworkouts = function (req, res) {

    dbacces.getAllWorkouts().then((data) => {
        if (!data) {
            utils.sendJSONresponse(res, 404, { "message": "No data found" })
        }
        utils.sendJSONresponse(res, 200, data);
    }).catch(err => {
        utils.sendJSONresponse(res, 404, err.message)
    });

};

module.exports.deleteWorkoutById = function (req, res) {

    //Check for workoutid
    if (!(req.params && req.params.workoutid)) {
        utils.sendJSONresponse(res, 404, { "message": "No workoutid in request" });
    }

    dbacces.deleteWorkoutById(req.params.workoutid).then(() => {
        utils.sendJSONresponse(res, 204, null);
    }).catch(err => {
        utils.sendJSONresponse(res, 404, err.message)
    });
}

module.exports.addWorkout = function (req, res) {
    var tmp = req.body

    console.log('tmp is ' + tmp.name)

    if (!tmp) {
        utils.sendJSONresponse(res, 404, { "message": "No correct input" })
    }

    //Check for workoutid
    dbacces.addWorkout(tmp).then((data) => {
        if (!data) {
            utils.sendJSONresponse(res, 404, { "message": "No data found" })
        }
        utils.sendJSONresponse(res, 201, data);
    }).catch(err => {
        utils.sendJSONresponse(res, 404,  err.message)
    });
};
