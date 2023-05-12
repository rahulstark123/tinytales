/*
Author : Rahul Raj 
College : Lovely Professional University 
Task : terriblytinytales assignment 
Year : 3rd Year 
*/

A description of the code


1.Importing Dependencies:
The code imports a number of dependencies, including React, useState, useEffect from'react', Bar and CSVLink from'react-chartjs-2', axios for sending HTTP queries, Chart and registerables from 'chart.js', and the CSS file './App.css'.


2.Setting up Chart.js:

Using Chart.register(...registerables), the code registers the required Chart.js modules. You can then utilise the Bar chart component in later scripts.


3.Functional Component Declaration:
The code defines a functional component named 'App' using the 'function' keyword.

4.State Initialization:
The code sets up state variables using the 'useState' hook.
'wordFrequencyCalculate': Stores the word frequency data for generating the chart.
'isDataLoaded': Indicates whether the data has been loaded.
'isTypingComplete': Indicates whether the typing effect for the greeting text is complete.

5.Typing Effect Simulation:

The code uses the 'useEffect' hook to simulate a typing effect for the greeting text.
It sets a timeout to change the value of 'isTypingComplete' to 'true' after 4000 milliseconds.
The returned function from 'useEffect' clears the timeout on component unmount.

6.Data Fetching:

The code defines an asynchronous function fetchDataAll that fetches data from the URL 'https://www.terriblytinytales.com/test.txt' using axios.
On a successful response, it counts the word frequencies in the retrieved text.
The word frequencies are stored in the 'wordCount' object using the reduce method.
The words are then sorted by frequency in descending order using the 'sort' method.
The top 20 words with the highest frequencies are extracted.
The 'chartDataFinal' object is created with the 'labels' containing the top 20 words and the datasets containing the word frequencies and a background color for the bar chart.
The 'chartDataFinal' is stored in the 'wordFrequencyCalculate' state variable, and isDataLoaded is set to 'true'.
If an error occurs during data fetching, it is logged to the console.


7.Data Export:
The' exportData' function is defined to convert the word frequency data into CSV format for exporting.
It maps over the labels (words) and datasets (frequencies) and constructs an array of objects with 'Word' and 'Frequency' properties.
The constructed array is returned.

8.Rendering:
The code renders the JSX elements.
The greeting message is displayed conditionally based on the 'isDataLoaded' and 'isTypingComplete' states.
The 'fetchDataAll' function is triggered when the 'Submit' button is clicked.
If 'isDataLoaded' is true, the Bar chart component from 'react-chartjs-2' is rendered with the provided data.
The CSVLink component from react-csv is rendered to enable exporting the data as a CSV file.

9.Exporting the Component:

The 'App' component is exported as the default export of the module.


