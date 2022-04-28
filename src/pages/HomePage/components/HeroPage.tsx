import React from "react";
import { Link } from "react-router-dom";

import { useFetchContext } from "../../../contexts/FetchContext";
import "../../../images/hero-bg.webp";

const Hero = () => {
  const { upcomingAnime } = useFetchContext();
  const currentAnime = upcomingAnime?.[0];

  const imgSrc = currentAnime?.images?.webp?.image_url;
  const imgAlt = currentAnime?.title;

  const title = currentAnime?.title;
  const synopsis = currentAnime?.synopsis?.slice(0, 500) + "...";
  const button = (
    <Link to={`/anime/${currentAnime?.mal_id}`}>
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
