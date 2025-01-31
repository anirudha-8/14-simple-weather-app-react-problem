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
					}`
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
		</div>
	);
}

export default App;
