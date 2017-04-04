//Create a Module - object literal
var myModule = {

	getPosition: function () {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(myModule.success, myModule.error);
		}
	},

	success: function (position) {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		const urlCoordinates = lat + "," + lon;
		myModule.geocodeRequest(urlCoordinates);
		myModule.weatherRequest(urlCoordinates);
	},

	error: function () {
		console.log("Unable to retrieve your location");
	},

	geocodeRequest: function (coordinates) {
		$.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordinates + "&key=AIzaSyALGD0_f9SHFf-RZPqE4Ts31UJQ6C8BqE8", function (location) {
			$("#sky").html(`${location.results[0].address_components[3].long_name}, ${location.results[0].address_components[5].long_name}`);
		});

	},

	weatherRequest: function (coordinates) {
		$.get("https://api.darksky.net/forecast/a4ad1b7a7685e16ae74b44a159a83762/" + coordinates + "?exclude=minutely,hourly,daily,alerts,flags", function (data) {

			myModule.weatherIcon(data)
			myModule.temperature(data);
		});
	},

	weatherIcon: function (data) {
		const iconDisplay = data.currently.icon;
		$("#icon").attr("src", "SVG/"+iconDisplay+".svg");
		console.log(data.currently.summary);

	},

	temperature: function (data) {
		let fTemp = data.currently.apparentTemperature;

		$("#tempDescription").html(`It feels like ${fTemp}&deg;F`);

		myModule.convertTemp(fTemp);
	},

	convertTemp: function(fTemp) {
		let cTemp = ((fTemp - 32) * (5 / 9));

		$("button").on("click", function () {
			 $(this).text($(this).text() == 'Fahrenheit' ? 'Celcius' : 'Fahrenheit');
			 if($(this).text() !== 'Fahrenheit') {
				 $("#tempDescription").html(`It feels like ${fTemp} &deg;F`);
			 } else {
						$("#tempDescription").html(`It feels like ${cTemp.toFixed(2)} &deg;C`);
			 }
		});

	},

}


myModule.getPosition();


//
//
// }
//
// function processIt(data) {
// alert(data.currently.temperature + data.timezone + data.currently.icon);
//
// }

// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night hail, thunderstorm, or tornado








//If the object doesn't exist, geolocation is not available
// if(!navigator.geolocation) {
//   console.log("Geolocation is not supported by your browser");
// }
//
// navigator.geolocation.getCurrentPosition(success, error);
//
// function error() {
//   console.log("Unable to retrieve your location");
// }
//
//
// function success(position) {
// let lat = position.coords.latitude;
// let lon = position.coords.longitude;
//
//
// $.get("https://api.darksky.net/forecast/a4ad1b7a7685e16ae74b44a159a83762/"+lat+","+lon+"?exclude=minutely,hourly,daily,alerts,flags", function(data) {
//   processIt(data);
// });
//
// }
//
// function processIt(data) {
// alert(data.currently.temperature + data.timezone + data.currently.icon);
//
// }

// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night hail, thunderstorm, or tornado
