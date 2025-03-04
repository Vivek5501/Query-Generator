import React from "react";
import { useNavigate } from "react-router-dom";

const QuerySearch = () => {
  const navigate = useNavigate();

  return (
    <div className="query-search">
      <h1>Query Generator</h1>
      <p>Generate business reports effortlessly using AI-powered tools.</p>
      <p>
        Quickly find the information you need with our intuitive search feature.
        Utilize natural language processing to formulate queries and receive
        instant insights that empower your business decisions.
      </p>
      <button
        className="explore-button"
        onClick={() => navigate("/query-generator")}
      >
        Explore
      </button>
    </div>
  );
};

export default QuerySearch;
