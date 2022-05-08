import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  set,
  onValue,
} from "firebase/database";

import { useAuthContext } from "../../contexts/AuthContext";
import { useFetchContext } from "../../contexts/FetchContext";
import { auth } from "../../firebase";
import { WatchedAnime } from "./components/WatchedAnime";

export default function UserPanelPage() {
  const { register, isAuth } = useAuthContext();
  const [watchedAnime, setWatchedAnime] = useState({});
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((prev) => !prev);

  //redirect
  const shouldRedirect = !isAuth;
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  });

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
    return <WatchedAnime key={anime?.mal_id} mal_id={anime?.mal_id} />;
  });

  const watchedAnimeMapContainer = (
    <div
      className={
        isActive
          ? "userpanel-page__list userpanel-page__list--active"
          : "userpanel-page__list userpanel-page__list--inactive"
      }
    >
      {watchedAnimeMap}
    </div>
  );

  const button =
    watchedAnimeMapContainer.props.children.length >= 4 ? (
      <button onClick={handleClick} className="button userpanel-page__seemore">
        {isActive ? "See more" : "See less"}
      </button>
    ) : null;

  return (
    <div className="userpanel-page">
      <div className="userpanel-page__title-container">
        <h1 className="userpanel-page__title">User panel</h1>
      </div>
      <div className="userpanel-page__container">
        <h2 className="userpanel-page__subtitle">Watched</h2>
        {watchedAnimeMapContainer}
        {button}
      </div>
    </div>
  );
}
