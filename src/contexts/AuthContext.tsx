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
import { auth } from "../firebase";
import { useLocation } from "react-router-dom";

type Data = {
  title?: string;
  mal_id?: number;
  images?: {
    webp?: {
      image_url: string;
    };
  };
};

type FechValue = {
  currentUser?: string | null;
  isAuth?: boolean | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<FechValue | undefined>(undefined);

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

  //   useEffect(() => {}, []);

  useEffect(() => {
    authObserver();
  }, []);

  function signup(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
      value={{ currentUser, isAuth, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used inside AuthContext");
  }

  return context;
};

export default AuthProvider;
