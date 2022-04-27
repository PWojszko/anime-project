import CurrentSeasonAnime from "./components/CurrentSeasonAnime";
import TopAnime from "./components/TopAnime";
import HeroPage from "./components/HeroPage";

export function HomePage() {
  return (
    <div className="home-page">
      <main className="home-page__main">
        <HeroPage />
        <CurrentSeasonAnime />
        <TopAnime />
      </main>
    </div>
  );
}
