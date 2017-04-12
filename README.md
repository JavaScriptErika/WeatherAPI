## WeatherAPI

### [View Your Current Weather Conditions!](https://javascripterika.github.io/WeatherAPI/)

![weatherapi](https://cloud.githubusercontent.com/assets/19316487/24981600/709c32d0-1fab-11e7-9bc3-bca93994a702.png)

Do you ever wonder what the weather is, but you don't feel like looking it up on the news and you lost your phone somewhere in the couch cushions? I completely understand, and I'd by lying if I didn't say that is, indeed, the story of my life. There's no need to worry, this little weather app has you covered. 

Dress appropriately and be prepared. You'll know what the temperature feels like outside at your location, the current weather conditions, and a short and sweet summary to...sum things up for the day! 

I created this weather app using [Dark Sky](https://darksky.net/poweredby/)'s API. Mad shoutouts to APIs that allow you to make 1,000 requests per day for free. When developing, it makes the building process much more enjoyable to be able to refresh multiple times for testing. I like to see what an error message looks like as well as the data output on the page, for example. The ability to only make a couple requests per few minutes, just isn't going to cut it.

In addition to giving credit where it is due, I also used [Adam Whitcroft's Climacons](http://adamwhitcroft.com/climacons/) for my weather icons! Hooray for clouds!

#### The Goal 
My goal is to grab a user's coordinates and display their location, their current temperature (toggle between Celsius/Fahrenheit), weather description, and display a weather icon that relates to their current conditions.

#### The Process 
To be able to get a user's location, I decided to go with geolocation that is built right in the browser. I added in a conditional statement to check if the user's geolocation object is supported by their browser. From there, I run the getCurrentPosition() method with a success and error callback. In my success function, I get the coordinates so that I may pass them into the urls for Dark Sky and [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start).  

Since Dark Sky does not provide geolocation based on coordinates, I use Google's geocode API to convert the coordinates to the user's city and state location to display. I use the coordinates for Dark Sky to retrieve the weather information-- the current temperature, icon information, and summary of the current weather conditions. I then pass on the data received from the Dark Sky API into separate functions to manipulate the data, and so they are their own component!

#### Obstacles
Dark Sky does not allow for CORS. This led me to a problem because even though GitHub enables it, Dark Sky has disabled cross-origin requests and requires you to pop up a proxy server. I totally understand so this is a way to keep API keys hidden and not abused (ps. please don't take advantage of my exposed API keys :heart:). Since I wanted to publish this on gh pages, this was not an option. After digging around, I used jsonp data type to get around this. Yes, it is VERY hacky, but I did learn that it works because jsonp takes the data and converts it into scripts to bypass the CORS issue.

I also had to make one of my variables in my code global in the context of my object! Why? Due to how I was calling my functions and using the object literal method, I had to have a way to pass in my fTemp not only to a function to display the temp, but to also use the data in an event when the button is clicked to convert the temperature from Fahrenheit to Celsius. I am interested in finding a better way to achieve this!

#### Remaining Thoughts
I really wanted to organize my code, rather than laying it on a page, function after function. This led me to design patterns, and I was a bit intimidated by it at first. I went with the Object Literal Pattern, and have to say, I love coding this way. Closure FTW! 

I see how Closure works. It's inner functions accessing outer function scope within its context. It's great for privacy, and organizing code.

It allows me to build in components, and presents organized logic to my app. Not to mention, I'm not hogging the global namespace, but rather keeping everything nice and contained. 

One thing I did NOT like about the Object Literal Pattern is binding "this" and using a proxy for "this" in context of the module object. It does mud up the syntax a bit and doesn't appear right off the bat as being beautiful code. 

Next up, I will try out the Revealing Module Pattern. Currently, I am learning and becoming familiar with React, so building in components with the design patterns is helping to solidify this way of thinking about code. 
