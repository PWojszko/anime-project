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
import WatchedAnimeList from "./WatchedAnimeList";
import UserProfile from "./UserProfile";

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

  return (
    <div className="userpanel-page">
      <div className="userpanel-page-watermark">
        <h1 className="userpanel-page-watermark__title">User panel</h1>
      </div>
      <div className="userpanel-page__container">
        <UserProfile />
        <WatchedAnimeList />
      </div>
    </div>
  );
}
