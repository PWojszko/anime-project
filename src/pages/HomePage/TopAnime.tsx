import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeListQuery } from "../../redux/api";

const TopAnime = () => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });

  const { data, error, isLoading, isSuccess } =
    useGetAnimeListQuery("top/anime");

  const TopAnimeList: JSX.Element = data?.data?.map((anime: anime) => (
    <Link key={anime?.mal_id} to={`/anime/${anime?.mal_id}`}>
      <div className="carousel__item">
        <p className="carousel__item-title">{anime?.title}</p>
        <img
          className="carousel__item-image"
          src={anime?.images?.webp?.image_url}
          alt={anime?.title}
        />
      </div>
    </Link>
  ));

  return (
    <section className="carousel">
      <div className="carousel__title-container">
        <h2 className="carousel__title">Top anime</h2>
        <div className="carousel__line"></div>
      </div>
      <div className="carousel__list" {...events} ref={ref}>
        {TopAnimeList}
      </div>
    </section>
  );
};

export default TopAnime;
