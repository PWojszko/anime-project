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
  mal_id?: number;
  title?: string;
  synopsis?: string;
  images?: {
    webp?: {
      image_url: string;
    };
  };
};

type FetchValue = {
  animeById?: AnimeByIdType | null | undefined;
  animeCharacters?: any | null | undefined; // to do types
  topAnime?: Data[] | null | undefined;
  currentAnime?: Data[] | null | undefined;
  upcomingAnime?: Data[] | null | undefined;
  getCurrentAnime?: () => void;
  getAnimeById?: (location: number) => void;
  getAnimeCharacters?: (location: number) => void;
  fetchAnimeByIdData?: (id: number) => void;
  setAnimeById?: any; // to do types
  loadingTopAnime: boolean;
  loadingCurrentAnime: boolean;
  loadingAnimeById: boolean;
  loadingAnimeCharacters: boolean;
};

export const FetchContext = createContext<FetchValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const FetchContextProvider = ({ children }: Props) => {
  const [topAnime, setTopAnime] = useState<Data[] | null>(null);
  const [currentAnime, setCurrentAnime] = useState<Data[] | null>(null);
  const [upcomingAnime, setUpcomingAnime] = useState<Data[] | null>(null);
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
    if (location.pathname === "/") fetchCurrentAnimeData();
    if (location.pathname === "/") fetchTopAnimeData();
    if (location.pathname === "/") fetchUpcomingAnimeData();
    if (locationNumber > 0) fetchAnimeByIdData();
    if (locationNumber > 0) fetchAnimeCharactersData();
  }, [location.pathname]);

  const fetchCurrentAnimeData = async () => {
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

  const fetchTopAnimeData = async () => {
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

  const fetchUpcomingAnimeData = async () => {
    setLoadingCurrentAnime(true);
    try {
      const { data: response } = await axios.get(
        "https://api.jikan.moe/v4/seasons/upcoming"
      );
      setUpcomingAnime(response.data);
    } catch (error) {
      console.error("CurrentAnime error");
    }
    setLoadingCurrentAnime(false);
  };

  const fetchAnimeByIdData = async (id: number = locationNumber) => {
    setLoadingAnimeById(true);
    try {
      const { data: response } = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}`
      );
      setAnimeById(response.data);
    } catch (error) {
      console.error("AnimeById error");
    }
    setLoadingAnimeById(false);
  };

  const fetchAnimeCharactersData = async () => {
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

  return (
    <FetchContext.Provider
      value={{
        animeById,
        animeCharacters,
        topAnime,
        currentAnime,
        upcomingAnime,
        setAnimeById,
        loadingTopAnime,
        loadingCurrentAnime,
        loadingAnimeById,
        loadingAnimeCharacters,
        fetchAnimeByIdData,
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
