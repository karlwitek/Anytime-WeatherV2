// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { fetch } from 'wix-fetch';
import wixData from 'wix-data';

let isFahrenheit = true;
let currentWeatherUp = false;
let forecastData = {};

async function fetchCityCurrentWeather(city=null) {

  isFahrenheit = $w('#tempUnitBtn').value === 'Radio button1' ? true : false;// 

  function getCityName() {// CHANGE , PUT OUTSIDE, ACCEPT PARAM
    if (city) {
      return city;
    }
    return $w('#inputTextField').value;
  }
  
  try {
      const forecastDataRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bd54beac6f5949fd8ef195520251004&q=${getCityName()}&days=5`);
      forecastData = await forecastDataRes.json();
      currentWeatherUp = true;
  } catch (error) {
    console.error('error fetching current weather', error);
  }

  console.log(forecastData);
  console.log(forecastData.current.condition.icon);

  
  //  move this code  
	displayProperUnits();
  let imageUrl = forecastData.current.condition.icon;
  let regEx = /(\d+)x(\d+)/;
  $w('#weatherImg').src = imageUrl.replace(regEx, "128x128");
}

function displayProperUnits() {
	if (isFahrenheit) {
        $w('#currentTemp').text = String(Math.round(forecastData.current.temp_f)) + "\u00B0" + "F" + 
          "   and   " + forecastData.current.condition.text;
        $w('#day1High').text = String(Math.round(forecastData.forecast.forecastday[0].day.maxtemp_f)) + "\u00B0" + "F" + "  high";
        $w('#day1Low').text = String(Math.round(forecastData.forecast.forecastday[0].day.mintemp_f)) + "\u00B0" + "F" + "  low";
        $w('#day2High').text = String(Math.round(forecastData.forecast.forecastday[1].day.maxtemp_f)) + "\u00B0" + "F" + "  high";
        $w('#day2Low').text = String(Math.round(forecastData.forecast.forecastday[1].day.mintemp_f)) + "\u00B0" + "F" + "  low";
        $w('#day3High').text = String(Math.round(forecastData.forecast.forecastday[2].day.maxtemp_f)) + "\u00B0" + "F" + "  high";
        $w('#day3Low').text = String(Math.round(forecastData.forecast.forecastday[2].day.mintemp_f)) + "\u00B0" + "F" + "  low";
        $w('#day4High').text = String(Math.round(forecastData.forecast.forecastday[3].day.maxtemp_f)) + "\u00B0" + "F" + "  high";
        $w('#day4Low').text = String(Math.round(forecastData.forecast.forecastday[3].day.mintemp_f)) + "\u00B0" + "F" + "  low";
        $w('#day5High').text = String(Math.round(forecastData.forecast.forecastday[4].day.maxtemp_f)) + "\u00B0" + "F" + "  high";
        $w('#day5Low').text = String(Math.round(forecastData.forecast.forecastday[4].day.mintemp_f)) + "\u00B0" + "F" + "  low";
    } else {
        $w('#currentTemp').text = String(Math.round(forecastData.current.temp_c)) + "\u00B0" + "C" +
          "   and   " + forecastData.current.condition.text;
        $w('#day1High').text = String(Math.round(forecastData.forecast.forecastday[0].day.maxtemp_c)) + "\u00B0" + "C" + "  high";
        $w('#day1Low').text = String(Math.round(forecastData.forecast.forecastday[0].day.mintemp_c)) + "\u00B0" + "C" + "  low";
        $w('#day2High').text = String(Math.round(forecastData.forecast.forecastday[1].day.maxtemp_c)) + "\u00B0" + "C" + "  high";
        $w('#day2Low').text = String(Math.round(forecastData.forecast.forecastday[1].day.mintemp_c)) + "\u00B0" + "C" + "  low";
        $w('#day3High').text = String(Math.round(forecastData.forecast.forecastday[2].day.maxtemp_c)) + "\u00B0" + "C" + "  high";
        $w('#day3Low').text = String(Math.round(forecastData.forecast.forecastday[2].day.mintemp_c)) + "\u00B0" + "C" + "  low";
        $w('#day4High').text = String(Math.round(forecastData.forecast.forecastday[3].day.maxtemp_c)) + "\u00B0" + "C" + "  high";
        $w('#day4Low').text = String(Math.round(forecastData.forecast.forecastday[3].day.mintemp_c)) + "\u00B0" + "C" + "  low";
        $w('#day5High').text = String(Math.round(forecastData.forecast.forecastday[4].day.maxtemp_c)) + "\u00B0" + "C" + "  high";
        $w('#day5Low').text = String(Math.round(forecastData.forecast.forecastday[4].day.mintemp_c)) + "\u00B0" + "C" + "  low";
    }

	$w('#currentCity').text = forecastData.location.name + ", " + forecastData.location.region;

	// five day forecast , 2 items in if stmt above
	$w('#imageDay1').src = forecastData.forecast.forecastday[0].day.condition.icon;
	$w('#day1Description').text = forecastData.forecast.forecastday[0].day.condition.text;

	$w('#imageDay2').src = forecastData.forecast.forecastday[1].day.condition.icon;
	$w('#day2Description').text = forecastData.forecast.forecastday[1].day.condition.text;

	$w('#imageDay3').src = forecastData.forecast.forecastday[2].day.condition.icon;
	$w('#day3Description').text = forecastData.forecast.forecastday[2].day.condition.text;

	$w('#imageDay4').src = forecastData.forecast.forecastday[3].day.condition.icon;
	$w('#day4Description').text = forecastData.forecast.forecastday[3].day.condition.text;

	$w('#imageDay5').src = forecastData.forecast.forecastday[4].day.condition.icon;
	$w('#day5Description').text = forecastData.forecast.forecastday[4].day.condition.text;  
}



$w.onReady(async function () {
  $w('#spinner').hide();
  $w('#favBtn').disable();

  await displayFavCityOnPageLoad();

	$w('#inputTextField').onKeyPress(async(event) => {
		
		if (event.key === 'Enter') {
      await fetchCityCurrentWeather(null);
		}
 	});

	$w('#inputTextField').onFocus((event) => {
		$w('#inputTextField').placeholder = "";
    $w('#inputTextField').value = "";
	});

	$w('#tempUnitBtn').onChange((event) => {
    isFahrenheit = (event.target.value == 'Radio button1') ? true : false;
    if (currentWeatherUp) {// change this....
      displayProperUnits();
    }
	});

	$w('#submitBtn').onClick(async() => {
    $w('#spinner').show();
    await fetchCityCurrentWeather();
    if (currentWeatherUp) {// DONT NEED THIS , IS EXEC IN 'fetchCity..'
      let imageUrl = forecastData.current.condition.icon;
      let regEx = /(\d+)x(\d+)/;
      $w('#weatherImg').src = imageUrl.replace(regEx, "128x128");
      
      const fadeOptions = {
        duration: 1000,
      };

      // spinner hides along with the overlay
      $w('#overlay').hide("fade", fadeOptions);
      $w('#favBtn').enable();
    }
 
	});

  async function queryFavoriteCity() {// try catch
    let cityObj = await wixData.query('cities').find();
    return cityObj;
  }

  async function displayFavCityOnPageLoad() {// need else? 

    $w('#spinner').show();// not yet

    let cityObj = await queryFavoriteCity();
    
    if (cityObj.items.length > 0) {
      await fetchCityCurrentWeather(cityObj.items[0].city);

      const fadeOptions = {
        duration: 1200,
        delay: 300,
      };

      // spinner hides along with the overlay
      $w('#overlay').hide("fade", fadeOptions);
      $w('#favBtn').enable();
    }
  }




  async function updateFavoriteCity() {// need try catch 2
    let cityObj = await queryFavoriteCity();
    if (cityObj.items.length > 0) {
      // update here
      let updatedObj = await wixData.update('cities', { _id: cityObj.items[0]._id,  city: forecastData.location.name + ", " + forecastData.location.region });
      console.log(updatedObj);
    } else {
      // insert here
      let insertedResObj = await wixData.insert('cities', { city: forecastData.location.name + ", " + forecastData.location.region });
      console.log(insertedResObj);
    }
  }

  $w('#favBtn').onClick(updateFavoriteCity);

});