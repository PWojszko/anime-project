import CurrentSeasonAnime from "./components/CurrentSeasonAnime";
import TopAnime from "./components/TopAnime";

export function HomePage() {
  return (
    <div className="home-page">
      <main className="home-page__main">
        <CurrentSeasonAnime />
        <TopAnime />
      </main>
    </div>
  );
}
