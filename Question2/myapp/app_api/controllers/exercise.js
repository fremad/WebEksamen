var mongoose = require('mongoose');
var wor = mongoose.model('Workout');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

module.exports.post = function(req, res) {
    if (req.params.workoutid){
        wor
            .findById(req.params.workoutid)
            .select('exercises')
            .exec(
                function(err, workout){
                    if(err){
                        sendJSONresponse(res,400,err)
                    } else {
                        doAddExercise(req, res, workout)
                    }
                })
    }
    else {
        sendJSONresponse(res,404,{
           "messsage": "workoutid not found"
        });
    }
  };

  var doAddExercise = function(req, res, workout) {
    if (!workout) {
      sendJSONresponse(res, 404, "workoutid not found");
    } else {
      workout.exercises.push({
        exercise: req.body.exercise,
        description: req.body.description,
        exset: req.body.exset,
        reps: req.body.reps
      });
      workout.save(function(err, workout) {
        var thisReview;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          thisReview = workout.exercises[workout.exercises.length - 1];
          sendJSONresponse(res, 201, thisReview);
        }
      });
    }
  };