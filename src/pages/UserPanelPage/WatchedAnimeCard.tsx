import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import axios from "axios";

import { useAuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeByIdQuery } from "../../redux/api";
import { skipToken } from "@reduxjs/toolkit/query/react";

type WatchedAnimeType = {
  mal_id?: number;
  title?: string;
  images?: {
    webp: {
      image_url?: string;
    };
  };
};

const WatchedAnimeCard = ({ mal_id }: WatchedAnimeType) => {
  const { data } = useGetAnimeByIdQuery(mal_id ?? skipToken);

  return (
    <div className="watched-anime-card">
      <img
        className="watched-anime-card__image"
        src={data?.data?.images?.webp?.image_url}
        alt={data?.data?.title}
      />
      <p className="watched-anime-card__title">{data?.data?.title}</p>
      <p>
        Rate: <strong>8/10</strong>
      </p>
    </div>
  );
};

export default WatchedAnimeCard;
