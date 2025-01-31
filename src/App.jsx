import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
						import.meta.env.VITE_WEATHER_API_KEY
					}&units=metric`
				)
					.then((res) => res.json())
					.then((data) => {
						setWeatherData(data);
						console.log(data);
					});
			});
		}
	}, []);

	return (
		<div>
			<h1>My Weather Forecast</h1>
			<div>
				{weatherData ? (
					<div>
						<h2>Your Location: {weatherData.name}</h2>
						<p>Temperature: {weatherData.main.temp} °C</p>
						<p>Humidity: {weatherData.main.humidity} %</p>
						<p>Pressure: {weatherData.main.pressure} hPa</p>
						<p>Wind: {weatherData.wind.speed} km/hr</p>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}

export default App;
