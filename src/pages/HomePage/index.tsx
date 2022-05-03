import CurrentSeasonAnime from "./components/CurrentSeasonAnime";
import TopAnime from "./components/TopAnime";
import Hero from "./components/Hero";

export function HomePage() {
  return (
    <div className="home-page">
      <main className="home-page__main">
        <Hero />
        <CurrentSeasonAnime />
        <TopAnime />
      </main>
    </div>
  );
}
