/*
Author : Rahul Raj 
College : Lovely Professional University 
Task : terriblytinytales assignment 
Year : 3rd Year 
*/
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import "./App.css";

Chart.register(...registerables);

function App() {
  const [wordFrequencyCalculate, setwordFrequencyCalculate] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Here we are simulating the typing effect for the greeting text
    const typingTimeout = setTimeout(() => {
      setIsTypingComplete(true);
    }, 4000);

    // Clean up the timeout on unmount
    return () => clearTimeout(typingTimeout);
  }, []);

  const fetchDataAll = async () => {
    try {
      const response = await axios.get(
        'https://www.terriblytinytales.com/test.txt'
      );
      const data = response.data;

      // Count word frequencies
      const wordCount = data
        .toLowerCase()
        .split(/[^\w']+/)
        .reduce((countMap, word) => {
          countMap[word] = (countMap[word] || 0) + 1;
          return countMap;
        }, {});

      // We are sorting words by their frequency in the sample text
      const sortedWordsFinal = Object.keys(wordCount).sort(
        (a, b) => wordCount[b] - wordCount[a]
      );

      // Here we are taking only top 20 frequently used words
      const top20Words = sortedWordsFinal.slice(0, 20);

      // Here we are creating chart for the given used words 
      const chartDataFinal = {
        labels: top20Words,
        datasets: [
          {
            label: 'Word Frequency',
            data: top20Words.map((word) => wordCount[word]),
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ],
      };

      setwordFrequencyCalculate(chartDataFinal);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportData = () => {
    const csvData = Object.entries(wordFrequencyCalculate.labels).map(([word, _], index) => ({
      Word: word,
      Frequency: wordFrequencyCalculate.datasets[0].data[index],
    }));

    return csvData;
  };

  return (
    <div className="container">
      {!isDataLoaded && <h1 className="greeting-message">Welcome to terriblytiny<span className='text1'>tales</span>  project work</h1>}
      {!isTypingComplete && (
        <h1 className="greeting-message">
          <span className="typewriter-text">Created by Rahul Raj</span>
        </h1>
      )}


      <button className="submit-btn" onClick={fetchDataAll}>Submit</button>
      {isDataLoaded && (
        <div className="chart-container">
          <Bar
            data={wordFrequencyCalculate}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  precision: 0,
                  stepSize: 1,
                },
              },
            }}
          />
          <CSVLink
            data={exportData()}
            filename={'word_frequency.csv'}
            className="export-btn"
            target="_blank"
          >
            Export
          </CSVLink>
        </div>

      )}
    </div>
  );
}

export default App;
