import React from "react";
import { Link } from "react-router-dom";

// import { useFetchContext } from "../../contexts/FetchContext";
import "../../images/hero-bg.webp";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeListQuery } from "../../redux/api";

const Hero = () => {
  const { data, error, isLoading, isSuccess } =
    useGetAnimeListQuery("seasons/upcoming");

  const firstElement = data?.data && data?.data[0];

  const imgSrc: string = firstElement?.images?.webp?.image_url;
  const imgAlt: string = firstElement?.title;
  const title: string = firstElement?.title;
  const synopsis: string = firstElement?.synopsis?.slice(0, 500) + "...";

  const button = (
    <Link to={`/anime/${firstElement?.mal_id}`}>
      <button className="hero__button button">See more</button>
    </Link>
  );

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__text">
          <h2>{title}</h2>
          <p>{synopsis}</p>
          {button}
        </div>
        <img className="hero__image" src={imgSrc} alt={imgAlt} />
      </div>
    </section>
  );
};

export default Hero;
