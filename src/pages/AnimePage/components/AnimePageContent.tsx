import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useDraggable } from "react-use-draggable-scroll";
import { useAuthContext } from "../../../contexts/AuthContext";

import { useFetchContext } from "../../../contexts/FetchContext";

const AnimePageContent = () => {
  const {
    animeById,
    animeCharacters,
    loadingAnimeById,
    loadingAnimeCharacters,
  } = useFetchContext();
  const { didUserWatchedAnime } = useAuthContext();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });
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
    ? animeCharacters?.map((character: any, id: number) =>
        character?.role === "Main" ? (
          <div key={id} className="anime-page__character-container">
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
                  <p className="anime-page__character-subtitle">
                    Voice actor:{" "}
                    {animeCharacters[0]?.voice_actors[0]?.person.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null
      )
    : null;

  return (
    <article className="anime-page__article">
      <p className="anime-page__watermark">{watermark}</p>
      <div className="anime-page__content">
        <div className="anime-page__content-part">
          <h1 className="anime-page__title">{animeById?.title}</h1>
          <p className="anime-page__text">{animeById?.synopsis}</p>
        </div>
        {image}
      </div>
      <button className="anime-page_button button" onClick={clickHandler}>
        Watched
      </button>

      <div className="anime-page__character-list" {...events} ref={ref}>
        {animeCharactersMap}
      </div>
      <div className="anime-page__parameter-list">{parametersListMap}</div>
      <div className="anime-page__video">{youtube}</div>
    </article>
  );
};

export default AnimePageContent;
