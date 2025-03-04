import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const QueryGenerator = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);
  const [savedQueries, setSavedQueries] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const savedQuestion = localStorage.getItem("question");
    const savedResponse = localStorage.getItem("response");
    const savedHistory = JSON.parse(localStorage.getItem("queryHistory")) || [];
    const savedSavedQueries = JSON.parse(localStorage.getItem("savedQueries")) || [];

    if (savedQuestion) setQuestion(savedQuestion);
    if (savedResponse) setResponse(JSON.parse(savedResponse));
    setQueryHistory(savedHistory);
    setSavedQueries(savedSavedQueries);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (question) localStorage.setItem("question", question);
    if (response) localStorage.setItem("response", JSON.stringify(response));
    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
    localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
  }, [question, response, queryHistory, savedQueries]);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/get_sql_query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setResponse(data);

    // Add to query history
    const newHistory = [
      { question, sql_query: data.sql_query, sql_result: data.sql_result },
      ...queryHistory,
    ];
    setQueryHistory(newHistory.slice(0, 5)); // Keep last 5 queries
  };

  const handleSaveQuery = () => {
    const savedQuery = { question, sql_query: response.sql_query, sql_result: response.sql_result };
    const updatedSavedQueries = [...savedQueries, savedQuery];
    setSavedQueries(updatedSavedQueries);
  };

  const handleLoadSavedQuery = (savedQuery) => {
    setQuestion(savedQuery.question);
    setResponse(savedQuery);
  };

  const handleClearHistory = () => {
    setQueryHistory([]);
    localStorage.setItem("queryHistory", JSON.stringify([]));
  };

  const handleClearSavedQueries = () => {
    setSavedQueries([]);
    localStorage.setItem("savedQueries", JSON.stringify([]));
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      {/* Left Column: Query Generator, History, Saved Queries */}
      <div className="flex-1 m-10 md:w-2/3 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 space-y-6 shadow-2xl border border-gray-800">
        {/* Query Generator Section */}
        <h1 className="text-4xl font-semibold text-white text-center">Query Generator</h1>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Generate Query
        </button>
        <button
          onClick={handleSaveQuery}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          disabled={!response}
        >
          Save Query
        </button>

        {/* Query History Section */}
        <div>
          <h3 className="text-lg font-semibold text-white">Query History</h3>
          <ul className="space-y-2">
            {queryHistory.length === 0 ? (
              <p className="text-white">No query history found.</p>
            ) : (
              queryHistory.map((item, index) => (
                <li key={index} className="p-4 text-white bg-gray-700 rounded-md">
                  <div className="font-medium">{item.question}</div>
                  <button
                    onClick={() => handleLoadSavedQuery(item)}
                    className="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    Load Query
                  </button>
                </li>
              ))
            )}
          </ul>
          <button
            onClick={handleClearHistory}
            className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Clear History
          </button>
        </div>

        {/* Saved Queries Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Saved Queries</h3>
          <ul className="space-y-2">
            {savedQueries.length === 0 ? (
              <p className="text-gray-500">No saved queries.</p>
            ) : (
              savedQueries.map((item, index) => (
                <li key={index} className="p-4 text-white bg-gray-700 rounded-md">
                  <div className="font-medium">{item.question}</div>
                  <button
                    onClick={() => handleLoadSavedQuery(item)}
                    className=" w-1/3 mt-2 text-sm text-blue-500 hover:underline"
                  >
                    Load Saved Query
                  </button>
                </li>
              ))
            )}
          </ul>
          <button
            onClick={handleClearSavedQueries}
            className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Clear Saved Queries
          </button>
        </div>
      </div>

      {/* Right Column: Result and Chart Visualization */}
      <div className="flex-1 p-12 md:w-1/3 bg-white bg-opacity-10 backdrop-blur-md rounded-lg  space-y-6 shadow-2xl border border-gray-800 text-white mt-6 md:mt-0">
        {/* Query Result and Chart Visualization */}
        {response ? (
          <>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Generated SQL Query:</h2>
              <pre className="bg-gray-900 p-4 rounded-md text-green-400 overflow-auto">
                {response.sql_query}
              </pre>
            </div>

            <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Query Result:</h2>
              {Array.isArray(response?.sql_result) && response.sql_result.length > 0 ? (
                <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      {Object.keys(response.sql_result[0]).map((key) => (
                        <th key={key} className="p-3 border border-gray-700">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {response.sql_result.map((row, index) => (
                      <tr key={index} className="text-center bg-gray-700 hover:bg-gray-600">
                        {Object.values(row).map((val, idx) => (
                          <td key={idx} className="p-3 border border-gray-600">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No results found.</p>
              )}
            </div>

            <div className="bg-white bg-opacity-20 p-10 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Chart Visualization:</h2>
              {Array.isArray(response?.sql_result) && response.sql_result.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={response.sql_result.map((row) => ({
                    tshirt_id: row["tshirt_id"], // X-Axis
                    stock_quantity: row["stock_quantity"], // Y-Axis
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis 
                    dataKey="tshirt_id" 
                    stroke="#ccc" 
                    label={{ value: " Stock Quantity", position: "insideBottom", dy: 2, fill: "#fff" }} 
                  />
                  <YAxis 
                    stroke="#ccc" 
                    label={{ value: "Tshirt ID", angle: -90, position: "insideLeft", dx:10,dy:25, fill: "#fff" }} 
                  />
                  <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                  <Bar dataKey="stock_quantity" fill="#4F46E5" radius={[5, 5, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
              
              
              ) : (
                <p>No chart data available.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center">Output will appear here</p>
        )}
      </div>
    </div>
  );
};

export default QueryGenerator;
