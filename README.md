# 📰 News Sentiment Dashboard

The **News Sentiment Dashboard** is a simple web application that allows users to input news headlines, analyze their sentiment (Positive, Negative, or Neutral), and visualize the results with an interactive pie chart.

Built with a **React.js** frontend and a **Django** backend, this tool uses the **VADER Sentiment Analysis** model to perform real-time sentiment classification of news content.

---

##  Features

- **Headline Sentiment Analysis**  
  Classifies news headlines as **Positive**, **Negative**, or **Neutral** based on sentiment scores.

- **Sentiment Visualization**  
  Displays a pie chart showing the sentiment distribution.

- **Top Headlines View**  
  Highlights the top Positive and Negative headlines based on sentiment score.

---

## 🛠 Tech Stack

### Frontend
- [React.js](https://reactjs.org/) – for building the user interface
- [Axios](https://axios-http.com/) – for making HTTP requests to the backend
- [Chart.js](https://www.chartjs.org/) – for creating the sentiment pie chart
- [Bootstrap](https://getbootstrap.com/) – for styling and responsive design

### Backend
- [Django](https://www.djangoproject.com/) – for handling API requests and backend logic
- [VADER Sentiment Analysis](https://github.com/cjhutto/vaderSentiment) – for sentiment scoring

---

##  How It Works

### 1. Frontend (React)
- Users paste news headlines into a text input area.
- Clicking **"Analyze"** sends a POST request to the Django backend.
- The backend returns sentiment results, which are then:
  - Visualized in a **pie chart**
  - Displayed in **top headline lists** for positive and negative scores

### 2. Backend (Django)
- Receives the headlines via API.
- Uses **VADER** to score and classify each headline.
- Sends a structured JSON response back to the frontend with:
  - Sentiment scores
  - Classification labels (Positive, Negative, Neutral)

---

##  Installation

### Prerequisites
- Node.js & npm (for frontend)
- Python & pip (for backend)
- Virtualenv (recommended for Python)

### Backend Setup (Django)
```bash
cd news_sentiment/
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py runserver


Frontend Setup (React)
cd frontend/
npm install
npm start
