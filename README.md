# 🌦️ Weather App

A responsive and modern weather application built with **React**, **Tailwind CSS**, and the **OpenWeatherMap API**. It allows users to search for real-time weather data and view a detailed daily and hourly forecast.

## 📸 Preview

![App Screenshot](./screenshot.png)

---

## ✨ Features

- 🔍 Search for current weather in any city
- 📍 Quick access to 5 default cities
- ➕ Add **one custom city** of your choice
- 📅 5-day forecast with icons and temperature
- 📱 Mobile responsive design using Tailwind CSS
- 🌓 Light/dark friendly layout
- 🌐 Units switchable between metric and imperial (if implemented)

---

## 🚀 Technologies Used

- **React**
- **Tailwind CSS**
- **OpenWeatherMap API**
- `sessionStorage` for storing custom city

---

## ⚙️ How to Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sRoVoN/forecast-app.git
   cd weather-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add your API key:

   ```
   VITE_API_KEY=your_openweather_api_key
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 🧠 Project Structure (Simplified)

```
src/
├── components/
│   ├── Input.jsx
│   ├── TopButtons.jsx
│   ├── Forecast.jsx
│   └── TempAndDetails.jsx
├── services/
│   └── weatherService.js
├── App.jsx

```

---

## 📝 Custom City Logic

- Users can add **one** custom city using the input field.
- The city is stored in `sessionStorage` under the key `customCity`.
- On reload, the custom city will still appear in the city buttons.
- Default cities (`Tehran`, `Paris`, etc.) cannot be removed.

---

## 📦 Deployment

To create a production build:

```bash
npm run build
```

Then deploy the contents of the `dist/` folder using any static host (e.g. Vercel, Netlify, GitHub Pages).

---

## 🙋‍♂️ Author

Created with ❤️ by Soodeh Arvin
[GitHub Profile](https://github.com/sRoVoN)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
