(function () { //wrapped in an iife so there are no global variables to global namespace
	var myModule = { //Object Literal Module

		init: function () {
			this.cacheDOM();
			this.getPosition();
			this.bindEvents();
		},

		cacheDOM: function () {
			this.$description = $("#tempDescription");
			this.$serverMsg = $("#serverMsg");
			this.$area = $("#area");
			this.$summary = $("#summary");
			this.$htmlEl = $(".info");
			this.$button = $(".degreesBtn");
			this.$icon = $("#icon");
		},

		getPosition: function () {
			if (!navigator.geolocation) { //checks if geolocation object is not available in browser
				this.$serverMsg.html("Geolocation is not supported by your browser");
			} else {
				navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this)); //callback functions of success and error, using bind this to refer to context of object and not getCurrentPosition().
			}
		},

		success: function (position) { //stores latitude and longitude
			const lat = position.coords.latitude,
						lon = position.coords.longitude,
						urlCoordinates = lat + "," + lon;
			this.geocodeRequest(urlCoordinates); //google api to grab location from coordinates
			this.weatherRequest(urlCoordinates); //dark sky api for weather conditions from coordinates
				this.$htmlEl.show();
		},

		error: function () {
			this.$serverMsg.html("Unable to retrieve your location");

		},

		geocodeRequest: function (coordinates) { //converts coordinates into user's city and state
			$.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordinates + "&key=AIzaSyALGD0_f9SHFf-RZPqE4Ts31UJQ6C8BqE8", function (location) {
				$("#area").html(`${location.results[0].address_components[3].long_name}, ${location.results[0].address_components[5].long_name}`);
			})
			.fail($.proxy(function () {
				this.$errorMsg.html("Sorry, something went wrong").bind(this);
			}, this));

		},

		weatherRequest: function (coordinates) { //darksky api to receive weather data based on user's coordinates
			$.ajax( {
				url: "https://api.darksky.net/forecast/a4ad1b7a7685e16ae74b44a159a83762/" + coordinates + "?exclude=minutely,hourly,daily,alerts,flags",
				dataType: 'jsonp',
				success: ($.proxy (function (data) { //using proxy fixes context of 'this' reference

					const iconDisplay = data.currently.icon;
					const summary = data.currently.summary;
					fTemp = data.currently.apparentTemperature; //global in the context of the closure to access variable in bindEvents();
					this.$serverMsg.hide();
					this.weatherIcon(iconDisplay);
					this.weatherSummary(summary);
					this.temperature(); //Will use fTemp
				}, this))})
				.fail($.proxy(function () {
					this.$errorMsg.html("Sorry, please try again later").bind(this);
				}, this));
		},

		weatherIcon: function (iconDisplay) {
			this.$icon.attr("src", "SVG/" + iconDisplay + ".svg");
		},

		weatherSummary: function (summary) {
			this.$summary.html(summary);
		},

		temperature: function () { //uses fTemp from global declaration(in context of object)
			this.$description.html(`Feels ${fTemp} \xB0F`);
		},

		bindEvents: function () {
			this.$button.on("click", this.convertTemp.bind(this));
		},

		//Receives fTemp from global declaration (in context of object)
		convertTemp: function () {
			let cTemp = ((fTemp - 32) * (5 / 9));
			//ternary operator to change the text of button when clicked
			this.$button.text(this.$button.text() == ' \xB0F' ? ' \xB0C' : ' \xB0F');
			//When button does not say Fahrenheit (since it's already converted to that), show temp in Fahrenheit from temperature func, else show Celsius
			if (this.$button.text() !== ' \xB0F') {
				this.temperature(fTemp);
			} else {
				this.$description.html(`Feels ${cTemp.toFixed(2)} \xB0C`);
			}
		},

	}

	myModule.init();

})();
