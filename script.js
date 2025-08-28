const API_KEY = 'fed81978340eaa7a0ed21032ccea18c5'; // Замените на ваш API ключ
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Элементы DOM
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Функция для получения погоды
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Пожалуйста, введите название города');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        );
        
        if (!response.ok) {
            throw new Error('Город не найден');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (err) {
        showError(err.message || 'Произошла ошибка при получении данных');
    } finally {
        hideLoading();
    }
}

// Функция для отображения погоды
function displayWeather(data) {
    const weatherHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <div style="font-size: 3rem; margin: 10px 0;">
                ${getWeatherIcon(data.weather[0].main)}
            </div>
            <h3>${data.weather[0].description}</h3>
            <div class="weather-info">
                <div class="weather-item">
                    <h3>🌡️ Температура</h3>
                    <p>${Math.round(data.main.temp)}°C</p>
                </div>
                <div class="weather-item">
                    <h3>💧 Влажность</h3>
                    <p>${data.main.humidity}%</p>
                </div>
                <div class="weather-item">
                    <h3>💨 Ветер</h3>
                    <p>${data.wind.speed} м/с</p>
                </div>
                <div class="weather-item">
                    <h3>🔅 Давление</h3>
                    <p>${data.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    `;
    
    weatherResult.innerHTML = weatherHTML;
}

// Функция для получения иконки погоды
function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌫️',
        'Fog': '🌫️',
        'Sand': '🌫️',
        'Ash': '🌫️',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    return icons[weatherMain] || '🌤️';
}

// Функции для управления UI
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.innerHTML = `<p>${message}</p>`;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

// Обработка нажатия Enter в поле ввода
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Инициализация приложения
function initApp() {
    // Можно добавить начальную загрузку данных для определенного города
    cityInput.value = 'Москва';
    getWeather();
}

// Запуск приложения при загрузке страницы
window.addEventListener('load', initApp);