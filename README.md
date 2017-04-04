## WeatherAPI 
### A Current Work in Progress

Do you ever wonder what the weather is, but you don't feel like looking it up on the news and you lost your phone somewhere in the couch cushions? I completely understand, and I'd by lying if I didn't say that is, indeed, the story of my life. There's no need to worry, this little weather app has you covered. 

Dress appropriately and be prepared. You'll know what the temperature feels like outside at your location, the current weather conditions, and a short and sweet summary to...sum things up for the day! 

I created this weather app using [Dark Sky](https://darksky.net/poweredby/)'s API. Mad shoutouts to APIs that allow you to make 1,000 requests per day for free. When developing, it makes the building process much more enjoyable to be able to refresh multiple times for testing. I like to see what an error message looks like as well as the data output on the page, for example. The ability to only make a couple requests per few minutes, just isn't going to cut it.

In addition to giving credit where it is due, I also used [Adam Whitcroft's Climacons](http://adamwhitcroft.com/climacons/) for my weather icons! Hooray for clouds!

#### The Goal 
My goal is to grab a user's coordinates and display their location, their current temperature (toggle between Celsius/Fahrenheit), weather description, and display a weather icon that relates to their current conditions.

#### The Process 
To be able to get a user's location, I decided to go with geolocation that is built right in the browser. I added in a conditional statement to check if the user's geolocation object is supported by their browser. From there, I run the getCurrentPosition() method with a success and error callback. In my success function, I get the coordinates so that I may pass them into the urls for Dark Sky and [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start).  

Since Dark Sky does not provide geolocation based on coordinates, I use Google's geocode API to convert the coordinates to the user's city and state location to display. I use the coordinates for Dark Sky to retrieve the weather information-- the current temperature, icon information, and summary of the current weather conditions. I then pass on the data received from the Dark Sky API into separate functions to manipulate the data, and so they are their own component!

#### Remaining Thoughts
I really wanted to organize my code, rather than laying it on a page, function after function. This led me to design patterns, and I was a bit intimidated by it at first. I went with the Object Literal Pattern, and have to say, I love coding this way. 

It allows me to build in components, and presents organized logic to my app. Not to mention, I'm not hogging the global namespace, but rather keeping everything nice and contained. Next up, I will try out the Revealing Module Pattern. Currently, I am learning and becoming familiar with React, so building in components with the design patterns is helping to solidify this way of thinking about code. 
