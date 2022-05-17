import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { useAuthContext } from "../../contexts/AuthContext";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeByIdQuery } from "../../redux/api";

const Content = () => {
  const { didUserWatchedAnime } = useAuthContext();
  const [isWatched, setIsWatched] = useState(false);

  const params: anime = useParams();
  const id = params?.id;

  const { data, error, isLoading } = useGetAnimeByIdQuery(id ?? skipToken);

  const imageUrl = data?.data?.images?.webp?.image_url;
  const title = data?.data?.title;

  const clickHandler = () => {
    if (data?.data?.mal_id) {
      const mal_id = data?.data?.mal_id;
      didUserWatchedAnime(mal_id, !isWatched);
    }
    setIsWatched((prev) => !prev);
  };

  const image = (
    <div className="anime-page__image-container">
      <img className="anime-page__image" src={imageUrl} alt={title} />
    </div>
  );

  const buttons = (
    <div className="anime-page_buttons">
      <div className="anime-page_buttons-container">
        <button
          onClick={clickHandler}
          className="anime-page_button anime-page_button-watched button"
        >
          Watched
        </button>
        <div className="anime-page_button anime-page_button-rate button">
          <span className="anime-page_button-text">Rate</span>
          <button className="anime-page_button-score button">1</button>
          <button className="anime-page_button-score button">2</button>
          <button className="anime-page_button-score button">3</button>
          <button className="anime-page_button-score button">4</button>
          <button className="anime-page_button-score button">5</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="anime-page__content">
      <div className="anime-page__content-part">
        <h1 className="anime-page__title">{data?.data?.title}</h1>
        <p className="anime-page__text">{data?.data?.synopsis}</p>
      </div>
      <div className="anime-page__container">
        {buttons}
        {image}
      </div>
    </div>
  );
};

export default Content;
