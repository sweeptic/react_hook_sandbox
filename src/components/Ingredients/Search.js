import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import "./Search.css";
import useHttp from "./../http/http";
import ErrorModal from "./../UI/ErrorModal";

const Search = React.memo(({ filteredIngredients }) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (inputRef.current.value === search) {
          const query =
            search.length === 0 ? "" : `?orderBy="title"&equalTo="${search}"`;

          sendRequest(
            "https://react-hooks-update-7337b.firebaseio.com/ingredients.json" +
              query,
            "GET"
          );
        }
      },
      !search ? 0 : 1500
    );

    return () => {
      clearTimeout(timer);
    };
  }, [search, filteredIngredients, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      filteredIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, filteredIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
