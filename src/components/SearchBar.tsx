import React, { FC } from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useFetchContext } from "../contexts/FetchContext";

const SearchBar = () => {
  const { getAnimeById } = useFetchContext();

  const [searchValue, setSearchValue] = useState("");
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);

  interface searchResultInterface {
    mal_id: number;
    title: string;
  }

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const searchAnime = async () => {
      const temp = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchValue}`
      ).then((res) => res.json());
      setSearchedAnime(temp.data.slice(0, 5));
      setIsSearchResultVisible(true);
    };
    searchAnime();
  };
  // needs disable results system

  const searchedAnimeList = searchedAnime?.map(
    (anime: searchResultInterface) => (
      <li key={anime?.mal_id}>
        <Link to={`/anime/${anime?.mal_id}`}>{anime?.title}</Link>
      </li>
    )
  );

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="search"
          placeholder="Search..."
          required
          value={searchValue}
          onChange={handleSearch}
        />
        <ul className="search__list">{searchedAnimeList}</ul>
      </form>
    </div>
  );
};

export default SearchBar;
