import * as React from "react";

import { useFetchContext } from "../../../contexts/FetchContext";
import "../../../images/hero-bg.webp";

const Hero = () => {
  const { upcomingAnime } = useFetchContext();

  const imgSrc = upcomingAnime?.[0].images?.webp?.image_url;
  const imgAlt = upcomingAnime?.[0].title;

  const title = upcomingAnime?.[0].title;
  const synopsis = upcomingAnime?.[0].synopsis?.slice(0, 500) + "...";

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__text">
          <h2>{title}</h2>
          <p>{synopsis}</p>
          <button className="button">See more</button>
        </div>
        <img className="hero__image" src={imgSrc} alt={imgAlt} />
      </div>
    </section>
  );
};

export default Hero;
