import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useLocation, useParams } from "react-router-dom";

type AnimeByIdType = {
  mal_id?: number;
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
  animeCharacters?: any | null | undefined; // need types
  topAnime?: Data[] | null | undefined;
  currentAnime?: Data[] | null | undefined;
  getCurrentAnime?: () => void;
  getAnimeById?: (location: number) => void;
  getAnimeCharacters?: (location: number) => void;
  setAnimeById?: any;
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

  const [loadingTopAnime, setLoadingTopAnime] = useState(true);
  const [loadingCurrentAnime, setLoadingCurrentAnime] = useState(true);
  const [loadingAnimeById, setLoadingAnimeById] = useState(true);
  const [loadingAnimeCharacters, setLoadingAnimeCharacters] = useState(true);

  let location = useLocation();
  let locationNumber = Number(
    location.pathname.slice(Number("/anime/".length))
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCurrentAnime(true);
      try {
        const { data: response } = await axios.get(
          "https://api.jikan.moe/v4/seasons/now"
        );
        setCurrentAnime(response.data);
      } catch (error) {
        console.error("CurrentAnime error");
      }
      setLoadingCurrentAnime(false);
    };

    if (location.pathname === "/") fetchData();
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTopAnime(true);
      try {
        const { data: response } = await axios.get(
          "https://api.jikan.moe/v4/top/anime"
        );
        setTopAnime(response.data);
      } catch (error) {
        console.error("TopAnime error");
      }
      setLoadingTopAnime(false);
    };
    if (location.pathname === "/") fetchData();
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAnimeById(true);
      try {
        const { data: response } = await axios.get(
          `https://api.jikan.moe/v4/anime/${locationNumber}`
        );
        setAnimeById(response.data);
      } catch (error) {
        console.error("AnimeById error");
      }
      setLoadingAnimeById(false);
    };
    if (locationNumber > 0) fetchData();
  }, [locationNumber]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAnimeCharacters(true);
      try {
        const { data: response } = await axios.get(
          `https://api.jikan.moe/v4/anime/${locationNumber}/characters`
        );
        setAnimeCharacters(response.data);
      } catch (error) {
        console.error("AnimeCharacters error");
      }
      setLoadingAnimeCharacters(false);
    };

    if (locationNumber > 0) fetchData();
  }, [locationNumber]);

  return (
    <FetchContext.Provider
      value={{
        animeById,
        animeCharacters,
        topAnime,
        currentAnime,
        setAnimeById,
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
