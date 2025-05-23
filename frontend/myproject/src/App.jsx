import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [headlines, setHeadlines] = useState('');
  const [data, setData] = useState(null);

  console.log("Sentiment Counts Data for Pie Chart: ", data?.sentiment_counts);

  const handleAnalyze = async () => {
    const lines = headlines.split('\n').filter(line => line.trim() !== '');
    try {
      const res = await axios.post('http://localhost:8000/analyze/', {
        headlines: lines
      });
      console.log("API Response:", res.data);
      setData(res.data);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  return (
    <div className="App container py-5">
      <div className="text-center">
        <h1 className="display-4 mb-4 text-primary font-weight-bold">News Sentiment Dashboard</h1>
        <p className="lead mb-5">Paste the headlines below and analyze their sentiment!</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <div className="form-group mb-4">
              <textarea
                className="form-control"
                rows="8"
                value={headlines}
                onChange={(e) => setHeadlines(e.target.value)}
                placeholder="Paste headlines here..."
              />
            </div>
            <div className="text-center">
              <button className="btn btn-lg btn-primary" onClick={handleAnalyze}>Analyze</button>
            </div>
          </div>
        </div>
      </div>

      {data && (
        <>
          <div className="my-5 d-flex justify-content-center">
            {data.sentiment_counts && Object.keys(data.sentiment_counts).length > 0 ? (
              <div className="card shadow-sm p-4" style={{ width: '500px' }}>
                <h3 className="text-center mb-4">Sentiment Distribution</h3>
                <Pie
                  data={{
                    labels: Object.keys(data.sentiment_counts),
                    datasets: [{
                      data: Object.values(data.sentiment_counts),
                      backgroundColor: ['#28a745', '#dc3545', '#6c757d'],
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <p className="text-center">No sentiment data available</p>
            )}
          </div>

          <div className="mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow-sm p-4">
                  <h3 className="text-success mb-4">Top Positive Headlines</h3>
                  <ul className="list-group">
                    {data.top_positive && data.top_positive.length > 0 ? (
                      data.top_positive.map((item, idx) => (
                        <li key={idx} className="list-group-item">{item.headline}</li>
                      ))
                    ) : (
                      <p>No positive headlines</p>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm p-4">
                  <h3 className="text-danger mb-4">Top Negative Headlines</h3>
                  <ul className="list-group">
                    {data.top_negative && data.top_negative.length > 0 ? (
                      data.top_negative.map((item, idx) => (
                        <li key={idx} className="list-group-item">{item.headline}</li>
                      ))
                    ) : (
                      <p>No negative headlines</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

