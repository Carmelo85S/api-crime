# 🕵️ Crime API

This is a simple REST API built with **Node.js** and **Express** that fetches the latest crime data from [Brottsplatskartan.se](https://brottsplatskartan.se). The API provides crime information for various cities in Sweden, and includes Swagger documentation for easy testing and integration.

---

## 🚀 Technologies Used

- **Express.js** – Web server framework
- **Axios** – For making HTTP requests
- **CORS** – Enable cross-origin requests
- **Swagger UI** – API documentation interface
- **swagger-jsdoc** – Generates Swagger/OpenAPI documentation from comments

---

## 📂 Features

- ✅ Get recent crimes in Helsingborg
- ✅ Fetch only crime headlines
- ✅ Query crime data by city name
- ✅ Retrieve the latest single crime event
- ✅ Swagger UI available at `/api-docs`

---

## 📦 Installation

```bash
npm install

▶️ Running the App
node server.js

Server will run on http://localhost:3000

Visit Swagger docs at: http://localhost:3000/api-docs

🔧 Available API Endpoints

📌 GET /crime
Returns the latest 5 crime events in Helsingborg.

Response:

[
  {
    "id": 312344,
    "title": "Bråk",
    "location": "Åstorp",
    "headline": "...",
    "description": "...",
    ...
  },
  ...
]


🗺️ GET /crimes/locations
Returns only headlines for the latest 5 crimes in Helsingborg.

Response:

[
  "Bråk mellan två lastbilschaufförer på ett företag...",
  "Inbrott i lägenhet på Södergatan...",
  ...
]


🌍 GET /crimes/search?city={city}
Returns the latest 5 crime events for a specific city.

Example:
GET /crimes/search?city=stockholm


🕒 GET /crimes/latest?city={city}
Returns only the latest (most recent) crime event for a specific city.

Example:
GET /crimes/latest?city=malmö

📘 Swagger Documentation

Interactive API docs are available at:
http://localhost:3000/api-docs

Includes:

Endpoint testing
Schema definitions
Query parameter descriptions

🧑‍💻 Author

Built by you 🚀 — proudly using open data to improve access to public safety info.

📜 License

MIT – Free to use and modify.







