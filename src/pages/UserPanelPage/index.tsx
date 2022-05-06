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

  const [watchedAnime, setWatchedAnime] = useState({});
  const watchedAnimeMap = Object.values(watchedAnime)?.map((anime: any) => {
    return <WatchedAnime mal_id={anime?.mal_id} />;
  });

  return (
    <div className="userpanel-page">
      <h1>User panel</h1>
      {watchedAnimeMap}
    </div>
  );
}
