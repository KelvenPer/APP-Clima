const container = document.querySelector('.container')
const Search = document.querySelector('.search-box button')
const Weatherbox = document.querySelector('.weather-box')
const WeatherDetails = document.querySelector('.weather-details')
const erro404 = document.querySelector('.not-found')

Search.addEventListener('click', () => {
    const APIkey = '56b74eb200c0ff369cf4e91982e12c12';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '404px';
                WeatherDetails.style.display = 'none';
                Weatherbox.style.display = 'none';
                erro404.style.display = 'block';
                erro404.classList.add('fadeIn');
                return;
            }

            erro404.style.display = 'none';
            erro404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperatura');
            const descricao = document.querySelector('.weather-box .descricao');
            const humidade = document.querySelector('.weather-details .humidade span');
            const vento = document.querySelector('.weather-details .vento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './img/clear.jpeg';
                    break;
                case 'Rain':
                    image.src = './img/rain.jpeg';
                    break;
                case 'Snow':
                    image.src = './img/snow.jpeg';
                    break;
                case 'Clouds':
                    image.src = './img/clouds.jpeg';
                    break;
                case 'Haze':
                    image.src = './img/haze.jpeg';
                    break;
                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            humidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${json.wind.speed} Km/h`;

            WeatherDetails.style.display = 'flex';
            Weatherbox.style.display = 'block';
            container.style.height = '590px';
            WeatherDetails.classList.add('fadeIn');
            Weatherbox.classList.add('fadeIn');
        });
}); 