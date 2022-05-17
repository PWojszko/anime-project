import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { Rotator } from "../../components/Rotator";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeCharactersQuery } from "../../redux/api";
import character from "../../types/character";

const Characters = () => {
  const params: anime = useParams();
  const id = params?.id;
  const { data, error, isLoading } = useGetAnimeCharactersQuery(
    id ?? skipToken
  );

  // console.log(data?.data && typeof data?.data[0]?.voice_actors[0]);

  const animeCharactersMap: JSX.Element = data?.data?.map(
    (character: character, id: number) => (
      <div key={id} className="anime-page__character-container rotator__item">
        <div
          className="anime-page__character-item"
          key={character?.character?.mal_id}
        >
          <div className="anime-page__character-text">
            <div className="anime-page__title-container">
              <div className="anime-page__line"></div>
              <p className="anime-page__character-title">
                {character?.character?.name}
              </p>
            </div>
            <img
              className="anime-page__character-image"
              src={character?.character?.images?.webp?.image_url}
              alt={character?.character?.name}
            />
            <div className="anime-page__subtitle-container">
              <div className="anime-page__line"></div>
              <p className="anime-page__character-subtitle">
                {"Voice actor: " +
                  (data?.data && data?.data[0]?.voice_actors[id]?.person.name)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="anime-page__character-list">
      {Rotator(animeCharactersMap, 1, 2, 3, 4)}
    </div>
  );
};

export default Characters;
