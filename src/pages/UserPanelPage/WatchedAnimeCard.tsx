import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import axios from "axios";

import { useAuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

type WatchedAnimeType = {
  title?: string;
  images?: {
    webp: {
      image_url?: string;
    };
  };
};

const WatchedAnimeCard = ({ mal_id }: any) => {
  const [watchedAnime, setWatchedAnime] = useState<WatchedAnimeType | null>(
    null
  );

  useEffect(() => {
    // const fetchAnimeByIdData = async (mal_id: number) => {
    //   try {
    //     const { data: response } = await axios.get(
    //       `https://api.jikan.moe/v4/anime/${mal_id}`
    //     );
    //     setWatchedAnime(response.data);
    //   } catch (error) {
    //     console.error("AnimeById error");
    //   }
    // };
    // fetchAnimeByIdData(mal_id);
  }, []);

  return (
    <div className="watched-anime-card">
      <img
        className="watched-anime-card__image"
        src={watchedAnime?.images?.webp.image_url}
        alt={watchedAnime?.title}
      />
      <p className="watched-anime-card__title">{watchedAnime?.title}</p>
      <p>
        Rate: <strong>8/10</strong>
      </p>
    </div>
  );
};

export default WatchedAnimeCard;
