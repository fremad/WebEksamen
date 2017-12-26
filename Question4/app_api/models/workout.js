var mongoose = require( 'mongoose' );

var exerciseSchema = new mongoose.Schema({
    exercise:       {type:String, "default": "Noname"},
    description:    {type:String, "default": "None availiable"},    
    exset:            {type:Number, "default":1,required: true},
    reps:           {type:Number, "default":1,required: true}
});

var workoutSchema = new mongoose.Schema({
    name: {type:String,"default":"Myworkout"},
    exercises: [exerciseSchema]
});

mongoose.model('Workout', workoutSchema, 'Workouts');

