import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [results, setResults] = useState([]);

  // first argument always is a function !!
  // second argument controls when will the function be executed
  // 3 options : [] , [term,term2] , or nth
  useEffect(() => {
    const searchAPI = async () => {
      const response = await axios.get("http://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(response.data.query.search);
    };

    const timer = setTimeout(() => {
      if (term) {
        searchAPI();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [term]);

  const renderedResult = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            GO
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term :</label>
          <input
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            className="input"
          ></input>
        </div>
      </div>
      <div className="ui celled list">{renderedResult}</div>
    </div>
  );
};

export default Search;
