var express = require('express');
var router = express.Router();
var homecontroller = require("../controllers/home"); 
var exercisecontroller = require("../controllers/exercise")

router
    .route('/')
        .get(homecontroller.index)
        .post(homecontroller.post);

router
    .route('/:workoutid')
        .get(homecontroller.getOne)
        .delete(homecontroller.workoutsDeleteOne)
        .put(homecontroller.workoutsUpdateOne);


router.post('/:workoutid/exercise', exercisecontroller.post);
/* router
    .route('/:workoutid/exerciseid')
        .post(exercisecontroller.post) */

module.exports = router;