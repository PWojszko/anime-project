import React, { useEffect, useRef, useState } from "react";
import { matchRoutes, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { useAuthContext } from "../../contexts/AuthContext";
import { useFetchContext } from "../../contexts/FetchContext";
import { Rotator } from "../../components/Rotator";

//types
import anime from "../../types/anime";

// redux
import {
  useGetAnimeByIdQuery,
  useGetAnimeCharactersQuery,
} from "../../redux/api";

const AnimePageContent = () => {
  const params: anime = useParams();
  const id = params?.id;

  const anime = useGetAnimeByIdQuery(id ?? skipToken);
  const animeData = anime.data;
  const animeError = anime.error;
  const animeIsLoading = anime.isLoading;

  const character = useGetAnimeCharactersQuery(id ?? skipToken);
  const characterData = character?.data;
  const characterError = character?.error;
  const characterIsLoading = character?.isLoading;

  const { animeCharacters } = useFetchContext();
  const { didUserWatchedAnime } = useAuthContext();
  const [isWatched, setIsWatched] = useState(false);

  const clickHandler = () => {
    if (animeData?.data?.mal_id) {
      const mal_id = animeData?.data?.mal_id;
      didUserWatchedAnime(mal_id, !isWatched);
    }
    setIsWatched((prev) => !prev);
  };

  const imageUrl = animeData?.data?.images?.webp?.image_url;
  const ytUrl = animeData?.data?.trailer?.embed_url;
  const images = animeData?.data?.images;
  const title = animeData?.data?.title;
  const titleJapan = animeData?.data?.title_japanese;

  const type = animeData?.data?.type;
  const episodes = animeData?.data?.episodes;
  const score = animeData?.data?.score;
  const year = animeData?.data?.year;

  const image = !animeIsLoading ? (
    <div className="anime-page__image-container">
      <img className="anime-page__image" src={imageUrl} alt={title} />
    </div>
  ) : null;

  const youtube = !animeIsLoading ? (
    <iframe
      src={ytUrl}
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : null;

  const watermark = !animeIsLoading ? titleJapan : "Ani|me";

  const parametersList = !animeIsLoading
    ? [
        { text: "Type", api: type },
        { text: "Episodes", api: episodes },
        { text: "Score", api: score },
        { text: "Year", api: year },
      ]
    : null;

  const parametersListMap = !animeIsLoading
    ? parametersList?.map((parameter, id) =>
        parameter.api ? (
          <div className="anime-page__parameter-item" key={id}>
            <p className="anime-page-parameter-title">{parameter.text}</p>
            <p className="anime-page-parameter-subtitle">{parameter.api}</p>
          </div>
        ) : null
      )
    : null;

  const animeCharactersMap = characterData?.data?.map(
    (character: any, id: number) => (
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
                  {"Voice actor: " +
                    animeCharacters[0]?.voice_actors[id]?.person.name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
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
    <article className="anime-page__article">
      <p className="anime-page__watermark">{watermark}</p>
      <div className="anime-page__content">
        <div className="anime-page__content-part">
          <h1 className="anime-page__title">{animeData?.data?.title}</h1>
          <p className="anime-page__text">{animeData?.data?.synopsis}</p>
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
