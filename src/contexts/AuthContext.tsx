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

type AuthValue = {
  currentUser?: string | null;
  isAuth?: boolean | null;
  register: (email: string, password: string, passwordConfirm: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
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

  //   useEffect(() => {}, []);

  useEffect(() => {
    authObserver();
  }, []);

  function register(email: string, password: string, passwordConfirm?: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("created " + email, password, passwordConfirm);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("creation fail " + email, password, passwordConfirm);
        // ..
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
      value={{ currentUser, isAuth, register, login, logout }}
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
