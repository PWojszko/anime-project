import { useEffect, useContext } from "react";

import { useFetchContext } from "../../contexts/FetchContext";

import CurrentSeasonAnime from "./components/CurrentSeasonAnime";
import TopAnime from "./components/TopAnime";

export function HomePage() {
  // const { getTopAnime, getCurrentAnime } = useContext(FetchContext);
  // const { currentAnime, topAnime } = useContext(FetchContext);
  // const { randomAnime, getRandomAnime } = useContext(FetchContext);

  // useEffect(() => {
  //   getTopAnime();
  //   getCurrentAnime();
  //   getRandomAnime();
  // }, []);

  return (
    <div className="home-page">
      <main className="home-page__main">
        <CurrentSeasonAnime />
        <TopAnime />
      </main>
    </div>
  );
}
