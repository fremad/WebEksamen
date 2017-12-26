var mongoose = require('mongoose');
var wor = mongoose.model('Workout');
var utils = require('../../DAL/utility');
var dbacces = require('../../DAL/db/dbacces');


var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getOne = function (req, res) {

  // console.log('Finding workout details', req.params);
  if (req.params && req.params.workoutid) {
    wor
      .findById(req.params.workoutid)
      .exec(function (err, workout) {
        if (!workout) {
          sendJSONresponse(res, 404, {
            "message": "workoutid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJSONresponse(res, 200, workout);
      });
  } else {
    console.log('No workoutid specified');
    sendJSONresponse(res, 404, {
      "message": "No workoutid in request"
    });
  }
};

module.exports.index = function (req, res) {

  dbacces.getAllWorkouts().then((data) => {
    if (!data) {
      utils.sendJSONresponse(res, 404, { "message": "No data found" })
    }
    utils.sendJSONresponse(res, 200, data);
  }).catch(err => {
    utils.sendJSONresponse(res, 404, err.message)
  });
};

module.exports.post = function (req, res) {
  wor.create({
    name: req.body.name
  }
    , function (err, workout) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, workout);
      }
    });
};

module.exports.workoutsDeleteOne = function (req, res) {
  var workoutid = req.params.workoutid;

  if (workoutid) {
    wor
      .findByIdAndRemove(workoutid)
      .exec(
      function (err, workout) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJSONresponse(res, 204, null)
      }
      );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No workoutid"
    });
  }
}

module.exports.workoutsUpdateOne = function (req, res) {
  if (!req.params.workoutid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, workoutid is required"
    });
    return;
  }
  wor
    .findById(req.params.workoutid)
    .exec(
    function (err, workout) {
      if (!workout) {
        sendJSONresponse(res, 404, {
          "message": "workoutid not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }
      workout.name = req.body.name;
      workout.surname = req.body.surname;
      workout.save(function (err, workout) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, workout);
        }
      });
    }
    );
};
