import React, { useContext } from "react";

import { useFetchContext } from "./contexts/FetchContext";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const { animeById, animeCharacters, topAnime, currentAnime, randomAnime } =
    useFetchContext();

  console.log(topAnime);
  console.log(currentAnime);

  return (
    <div>
      <h1>{123}</h1>
    </div>
  );
}
