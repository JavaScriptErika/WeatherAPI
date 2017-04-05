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
		$("#tempDescription").html("Unable to retrieve your location");
	},

	geocodeRequest: function (coordinates) {
		$.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordinates + "&key=AIzaSyALGD0_f9SHFf-RZPqE4Ts31UJQ6C8BqE8", function (location) {
			$("#area").html(`${location.results[0].address_components[3].long_name}, ${location.results[0].address_components[5].long_name}`);
		});

	},

	weatherRequest: function (coordinates) {
		$.get("https://api.darksky.net/forecast/a4ad1b7a7685e16ae74b44a159a83762/" + coordinates + "?exclude=minutely,hourly,daily,alerts,flags", function (data) {}).done(function (data) {
				myModule.weatherIcon(data);
				myModule.weatherSummary(data);
				myModule.temperature(data);
				$(".info").show();
			})
			.fail(function () {
				$("#tempDescription").html("Sorry, please try again later")

			});
	},

	weatherIcon: function (data) {
		const iconDisplay = data.currently.icon;
		$("#icon").attr("src", "SVG/" + iconDisplay + ".svg");
	},

	weatherSummary: function(data) {
		$("#summary").html(data.currently.summary);
	},

	temperature: function (data) {
		let fTemp = data.currently.apparentTemperature;

		$("#tempDescription").html(`Feels like ${fTemp}&deg;F`);

		myModule.convertTemp(fTemp);
	},

	convertTemp: function (fTemp) {
		let cTemp = ((fTemp - 32) * (5 / 9));

		$("button").on("click", function () {
			$(this).text($(this).text() == 'Fahrenheit' ? 'Celcius' : 'Fahrenheit');
			if ($(this).text() !== 'Fahrenheit') {
				$("#tempDescription").html(`Feels like ${fTemp} &deg;F`);
			} else {
				$("#tempDescription").html(`Feels like ${cTemp.toFixed(2)} &deg;C`);
			}
		});

	},

}


myModule.getPosition();
