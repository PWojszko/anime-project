import CurrentSeasonAnime from "./CurrentSeasonAnime";
import TopAnime from "./TopAnime";
import Hero from "./Hero";

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
