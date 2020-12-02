import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  //　外部APIから取得した値
  const [items, setItems] = useState([]);
  // 入力した値
  const [inputValue, setInputValue] = useState("react");
  // クエリパラメータ
  const [query, setQuery] = useState();
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setItems(result.data.hits);
      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          setQuery(inputValue);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <button type="submit">検索</button>
      </form>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
