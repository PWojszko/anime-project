import React from "react";
import { useState, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Link } from "react-router-dom";

import { useFetchContext } from "../../../contexts/FetchContext";

function TopAnime() {
  const { topAnime } = useFetchContext();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });

  const TopAnimeList = topAnime?.map((anime) => (
    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
      <div className="carousel__item">
        <p className="carousel__item-title">{anime.title}</p>
        <img
          className="carousel__item-image"
          src={anime?.images?.webp?.image_url}
          alt={anime?.title}
        />
      </div>
    </Link>
  ));

  return (
    <div className="carousel">
      <div className="carousel__title-container">
        <h2 className="carousel__title">Top anime</h2>
      </div>
      <div className="carousel__list" {...events} ref={ref}>
        {TopAnimeList}
      </div>
    </div>
  );
}

export default TopAnime;
