const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = "32d53531153c4c84ed535eb5608ab5cc";

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  // res.send('Hello World!')
  // res.render('index');

  res.render('index', {weather: null, error: null});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/sachin', function(req,res){
	// console.log(req)
	res.send('Hey Sachin & Rutu!')
})


app.post('/', function (req, res) {
	console.log('User have typed city : ' + req.body.city);

	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {

	console.log(url);
	console.log(response.body);

    if(err){
      res.render('index', {weather: null, error: 'Error' + err });
    } else {
      let weatherObj = JSON.parse(body)
      if(weatherObj.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again -- ' + weatherObj.message});
      } else {

      	let F = weatherObj.main.temp;
      	let C = (F - 32) * (5/9);
      	C = Number((C).toFixed(1));

        let weatherText = `It's ${C} degrees in ${weatherObj.name} -- ${weatherObj.weather[0].main} `;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });

  // res.render('index');
})


