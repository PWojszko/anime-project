import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";

type AnimeByIdType = {
  images?: { webp: { image_url: string } };
  trailer?: { embed_url: string };
  title_japanese?: string;
  type?: string;
  episodes?: number;
  score?: number;
  year?: number;
  title?: string;
  synopsis?: string;
};

type Data = {
  title?: string;
  mal_id?: number;
  images?: {
    webp?: {
      image_url: string;
    };
  };
};

type FetchValue = {
  animeById?: AnimeByIdType | null | undefined;
  animeCharacters?: any | null | undefined;
  topAnime?: Data[] | null | undefined;
  currentAnime?: Data[] | null | undefined;
  getCurrentAnime?: () => void;
  getAnimeById?: (location: number) => void;
  getAnimeCharacters?: (location: number) => void;
};

export const FetchContext = createContext<FetchValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const FetchContextProvider = ({ children }: Props) => {
  const [topAnime, setTopAnime] = useState<Data[] | null>(null);
  const [currentAnime, setCurrentAnime] = useState<Data[] | null>(null);
  const [animeById, setAnimeById] = useState<AnimeByIdType | null>(null);
  const [animeCharacters, setAnimeCharacters] = useState<Data[] | null>(null);

  // const location = useLocation().pathname;

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/seasons/now").then((response) => {
      setCurrentAnime(response.data.data);
    });
    axios.get("https://api.jikan.moe/v4/top/anime").then((response) => {
      setTopAnime(response.data.data);
    });
  }, []);

  function getAnimeById(location: number) {
    axios.get(`https://api.jikan.moe/v4/anime/${location}`).then((response) => {
      setAnimeById(response.data.data);
    });
  }

  function getAnimeCharacters(location: number) {
    axios
      .get(`https://api.jikan.moe/v4/anime/${location}/characters`)
      .then((response) => {
        setAnimeCharacters(response.data.data);
      });
  }

  return (
    <FetchContext.Provider
      value={{
        animeById,
        animeCharacters,
        topAnime,
        currentAnime,
        getAnimeById,
        getAnimeCharacters,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => {
  const context = useContext(FetchContext);

  if (context === undefined) {
    throw new Error("useFetchContext must be used inside AuthContext");
  }

  return context;
};

export default FetchContextProvider;
