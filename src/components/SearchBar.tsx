import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//types
import anime from "../types/anime";

// redux
import { useLazyGetAnimeListQuery } from "../redux/api";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedAnime, setSearchedAnime] = useState<anime>();
  const [trigger, result] = useLazyGetAnimeListQuery();

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    trigger("anime?q=" + searchValue);
  };

  useEffect(() => {
    const array = result?.data?.data;
    setSearchedAnime(array?.slice(0, 5));
  }, [result]);

  interface searchResultInterface {
    mal_id: number;
    title: string;
  }

  const searchedAnimeList: JSX.Element = searchedAnime?.map(
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
