import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";

import { useFetchContext } from "../../../contexts/FetchContext";

function CurrentSeasonAnime() {
  const { currentAnime } = useFetchContext();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });

  console.log(currentAnime);
  const currentAnimeList = currentAnime?.map((anime) => (
    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
      <div className="carousel__item">
        <p className="carousel__item-title">{anime.title}</p>
        <img
          className="carousel__item-image"
          src={anime?.images?.webp?.image_url}
          alt={anime.title}
        />
      </div>
    </Link>
  ));

  return (
    <div className="carousel">
      <div className="carousel__title-container">
        <h2 className="carousel__title">Current season</h2>
      </div>

      <div className="carousel__list" {...events} ref={ref}>
        {currentAnimeList}
      </div>
    </div>
  );
}

export default CurrentSeasonAnime;
