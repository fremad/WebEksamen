var mongoose = require('mongoose');
var db_workouts = mongoose.model('Workout');
var utils = require('../utility');

module.exports.getWorkoutById = function (id) {

  return new Promise(function (resolve, reject) {
    db_workouts.findById(id)
      .exec((err, workout) => {
        if (err) {
          reject(err);
        }
        resolve(workout);
      });
  });
}

module.exports.getAllWorkouts = function () {

  return new Promise(function (resolve, reject) {
    db_workouts.find()
      .exec((err, workout) => {
        if (err) {
          reject(err);
        }
        resolve(workout);
      });
  });
}

module.exports.deleteWorkoutById = function (id) {
  return new Promise(function (resolve, reject) {
    db_workouts.findByIdAndRemove(id)
      .exec((err, workout) => {
        if (err) {
          reject(err);
        }
        resolve(workout);
      });
  });
}

module.exports.addWorkout = function (workout) {

  return new Promise(function (resolve, reject) {

    console.log("Called and workout" + workout.name)

    db_workouts.create({
      name: workout.name
    }, function (err, workout) {
      if (err) {
        reject(err);
      } else {
        resolve(workout);
      }
    });
  });
}

module.exports.addExercise = function (workoutid, exercise) {

  return new Promise(function (resolve, reject) {

    db_workouts
      .findById(workoutid)
      .select('exercises')
      .exec(
      function (err, workout) {
        if (err) {
          reject(err);
        }
        else {
          workout.exercises.push({
            exercise: exercise.exercise,
            description: exercise.description,
            exset: exercise.exset,
            reps: exercise.reps
          });
          workout.save(function (err, workout) {
            if (!err) {
              reject(err);
            }
            resolve(workout);
          });
        }
      });
  });
}