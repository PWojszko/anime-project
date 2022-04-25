import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
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

import { auth } from "../firebase";

type Data = {
  title?: string;
  mal_id?: number;
  images?: {
    webp?: {
      image_url: string;
    };
  };
};

type AuthValue = {
  currentUser?: string | null;
  isAuth?: boolean | null;
  register: (email: string, password: string, passwordConfirm: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  didUserWatchedAnime: (id: number, isWatched: boolean) => void;
};

export const AuthContext = createContext<AuthValue | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(
    null
  );
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    authObserver();
  }, []);

  function writeUserData(userId: string, email: string, password: string) {
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      email: email,
      password: password,
    });
  }

  function didUserWatchedAnime(AnimeId: number, isWatched: boolean) {
    const db = getDatabase();
    const newUserKey = push(child(ref(db), "users")).key;
    const user = auth?.currentUser?.uid;

    const userData = {
      AnimeId: [123, 1234],
    };

    const updates: any = {};
    updates["users/" + user + "/watched"] = userData;

    const watchedAnimeRef = ref(db, "users/");
    onValue(watchedAnimeRef, (snapshot) => {
      const data = snapshot.val();
      // updateWatchedAnimeRef(postElement, data);
      setUserInfo(data);
      console.log(userInfo);
    });

    return update(ref(db), updates);
  }

  function register(email: string, password: string, passwordConfirm?: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("created " + email, password, passwordConfirm);
        writeUserData(user?.uid, email, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("creation fail " + email, password, passwordConfirm);
      });
  }

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("logged " + email, password);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("login fail " + email, password);
        // ..
      });
  }

  function logout() {
    setCurrentUser(null);
    return signOut(auth);
  }

  function authObserver() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setCurrentUser(auth?.currentUser?.email);
        setIsAuth(true);
        console.log("Hello " + auth.currentUser?.email);
      } else {
        setIsAuth(false);
        console.log("Log out");
        // User is signed out
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuth,
        register,
        login,
        logout,
        didUserWatchedAnime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("  must be used inside AuthContext");
  }

  return context;
};

export default AuthProvider;
