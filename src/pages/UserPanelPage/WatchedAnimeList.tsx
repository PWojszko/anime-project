import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { useAuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import WatchedAnimeCard from "./WatchedAnimeCard";

const WatchedAnimeList = () => {
  const { register, isAuth } = useAuthContext();
  const [watchedAnime, setWatchedAnime] = useState({});
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((prev) => !prev);

  useEffect(() => {
    const user = auth?.currentUser?.uid;
    const db = getDatabase();
    const watchedAnimeRef = ref(db, "users");

    onValue(watchedAnimeRef, (snapshot) => {
      const data = snapshot.val();
      setWatchedAnime(data[`${user}`].libary);
    });
  }, []);

  const watchedAnimeMap = Object.values(watchedAnime)?.map((anime: any) => {
    return <WatchedAnimeCard key={anime?.mal_id} mal_id={anime?.mal_id} />;
  });

  const watchedAnimeMapContainer = (
    <div
      className={
        isActive
          ? "watched-anime__list watched-anime__list--active"
          : "watched-anime__list watched-anime__list--inactive"
      }
    >
      {watchedAnimeMap}
    </div>
  );

  const button =
    watchedAnimeMapContainer.props.children.length >= 4 ? (
      <button onClick={handleClick} className="button watched-anime__button">
        {isActive ? "See less" : "See more"}
      </button>
    ) : null;

  return (
    <div className="watched-anime">
      <h2 className="watched-anime__title">Watched</h2>
      {watchedAnimeMapContainer}
      {button}
    </div>
  );
};

export default WatchedAnimeList;
