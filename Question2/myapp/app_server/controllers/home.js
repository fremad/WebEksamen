var request = require('request');
var apiOptions = {                      
  server : "http://localhost:3000"      
};          


module.exports.singleworkout = function(req, res){
  
  var path = '/api/' + req.params.workoutid;
  

    var requestOptions = { 
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {
      }
    };
    request(
      requestOptions,
        function(err, response, body){
          if(err) {
            console.log("something went wrong");
          }
          else
          {
            console.log(body);
          }
          res.render('workout', { title: 'ExerciseMe' , workout: body});      
        })
}

module.exports.index = function(req, res){
    
  var path = '/api';

  var requestOptions = { 
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
    }
  };
  request(
    requestOptions,
      function(err, response, body){
        if(err) {
          console.log("something went wrong");
        }
        else
        {
        }
        res.render('index', { title: 'ExerciseMe' , names: body});      
      })
  };

  module.exports.data = function(req, res){
    
    var myvar = {
      name: 'john'
    };
    res.json(JSON.stringify(myvar))
  };

  module.exports.addExercise = function(req, res){

    console.log("ADD EXERCISE CALLED !!!!!!!!!!!!!!!!!!!")
    var path = apiOptions.server +'/api/' + req.params.workoutid;
    var workouid = req.params.workoutid;
        var postdata = {
          exercise: req.body.exercise,
          description: req.body.description,
          exset: parseInt(req.body.exset),
          reps: parseInt(req.body.reps)
        } 
        
        console.log(postdata);
        console.log(path)

          var requestOptions = { 
            url : path+'/exercise',
            method : "post",
            json : postdata,
            qs : {
            }
          };
          request(
            requestOptions,
              function(err, response, body){
                if(response.statusCode === 201) {
                  res.redirect(apiOptions.server+'/data/'+workouid);      
                }
                else
                {
                  console.log("something went wrong");
                }
              })
  
  }

  module.exports.post = function(req, res){
    
    console.log(req.body.name);

    var path = '/api';

    var postdata = {name: req.body.name} 
    
      var requestOptions = { 
        url : apiOptions.server + path,
        method : "post",
        json : postdata,
        qs : {
        }
      };
      request(
        requestOptions,
          function(err, response, body){
            if(response.statusCode === 201) {
              res.redirect(apiOptions.server);      
            }
            else
            {
              console.log("something went wrong");
            }
          })
  };