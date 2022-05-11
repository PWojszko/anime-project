import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { useFetchContext } from "../../contexts/FetchContext";
import { Rotator } from "../../components/Rotator";

const AnimePageContent = () => {
  const {
    animeById,
    animeCharacters,
    loadingAnimeById,
    loadingAnimeCharacters,
  } = useFetchContext();
  const { didUserWatchedAnime } = useAuthContext();
  const [isWatched, setIsWatched] = useState(false);

  const clickHandler = () => {
    if (animeById?.mal_id) {
      const { mal_id } = animeById;
      didUserWatchedAnime(mal_id, !isWatched);
    }
    setIsWatched((prev) => !prev);
  };

  const image =
    animeById?.images && !loadingAnimeById ? (
      <div className="anime-page__image-container">
        <img
          className="anime-page__image"
          src={animeById?.images.webp.image_url}
          alt={animeById?.title}
        />
      </div>
    ) : null;

  const youtube =
    animeById?.trailer && !loadingAnimeById ? (
      <iframe
        src={animeById?.trailer.embed_url}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : null;

  const watermark =
    animeById?.title_japanese && !loadingAnimeById
      ? animeById?.title_japanese
      : null;

  const parametersList = !loadingAnimeById
    ? [
        { text: "Type", api: animeById?.type },
        { text: "Episodes", api: animeById?.episodes },
        { text: "Score", api: animeById?.score },
        { text: "Year", api: animeById?.year },
      ]
    : null;

  const parametersListMap = !loadingAnimeById
    ? parametersList?.map((parameter, id) =>
        parameter.api ? (
          <div className="anime-page__parameter-item" key={id}>
            <p className="anime-page-parameter-title">{parameter.text}</p>
            <p className="anime-page-parameter-subtitle">{parameter.api}</p>
          </div>
        ) : null
      )
    : null;

  const animeCharactersMap = !loadingAnimeCharacters
    ? animeCharacters?.map((character: any, id: number) => (
        <div key={id} className="anime-page__character-container rotator__item">
          <div
            className="anime-page__character-item"
            key={character?.character.mal_id}
          >
            <div className="anime-page__character-text">
              <div className="anime-page__title-container">
                <div className="anime-page__line"></div>
                <p className="anime-page__character-title">
                  {character?.character.name}
                </p>
              </div>
              <img
                className="anime-page__character-image"
                src={character.character?.images.webp.image_url}
                alt={character.character?.name}
              />
              <div className="anime-page__subtitle-container">
                <div className="anime-page__line"></div>
                {animeCharacters[0]?.voice_actors[id] ? (
                  <p className="anime-page__character-subtitle">
                    Voice actor:{" "}
                    {animeCharacters[0]?.voice_actors[id]?.person.name}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))
    : null;

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
    <article className="anime-page__article">
      <p className="anime-page__watermark">{watermark}</p>
      <div className="anime-page__content">
        <div className="anime-page__content-part">
          <h1 className="anime-page__title">{animeById?.title}</h1>
          <p className="anime-page__text">{animeById?.synopsis}</p>
        </div>
        <div className="anime-page__container">
          {buttons}
          {image}
        </div>
      </div>

      <div className="anime-page__character-list">
        {Rotator(animeCharactersMap, 1, 2, 3, 4)}
      </div>
      <div className="anime-page__parameter-list">{parametersListMap}</div>
      <div className="anime-page__video">{youtube}</div>
    </article>
  );
};

export default AnimePageContent;
