import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";

type Data = {
  title?: string;
  mal_id?: number;
  images?: {
    webp?: {
      image_url: string;
    };
  };
};

type FechValue = {
  animeById?: Data[] | null;
  animeCharacters?: Data[] | null;
  topAnime?: Data[] | null;
  currentAnime?: Data[] | null;
  randomAnime?: Data[] | null;
  getCurrentAnime?: () => void;
  getAnimeById?: (location: string) => void;
  getAnimeCharacters?: (location: string) => void;
  getRandomAnime?: () => void;
};

export const FetchContext = createContext<FechValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const FetchContextProvider = ({ children }: Props) => {
  const [topAnime, setTopAnime] = useState<Data[] | null>(null);
  const [currentAnime, setCurrentAnime] = useState<Data[] | null>(null);
  const [animeById, setAnimeById] = useState<Data[] | null>(null);
  const [animeCharacters, setAnimeCharacters] = useState<Data[] | null>(null);
  const [randomAnime, setRandomAnime] = useState<Data[] | null>(null);
  const location = useLocation().pathname;

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime").then((response) => {
      setTopAnime(response.data.data);
    });
    axios.get("https://api.jikan.moe/v4/seasons/now").then((response) => {
      setCurrentAnime(response.data.data);
    });
    axios.get(`https://api.jikan.moe/v4${location}`).then((response) => {
      setAnimeById(response.data.data);
    });
    axios
      .get(`https://api.jikan.moe/v4${location}/characters`)
      .then((response) => {
        setAnimeCharacters(response.data.data);
      });
  }, []);

  return (
    <FetchContext.Provider
      value={{
        animeById,
        animeCharacters,
        topAnime,
        currentAnime,
        randomAnime,
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
