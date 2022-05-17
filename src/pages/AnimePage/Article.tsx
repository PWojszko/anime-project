import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { useAuthContext } from "../../contexts/AuthContext";

import Characters from "./Characters";
import Content from "./Content";
import Youtube from "./Youtube";
import Parameters from "./Parameters";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeByIdQuery } from "../../redux/api";

const Article = () => {
  const params: anime = useParams();
  const id = params?.id;

  const { data, error, isLoading } = useGetAnimeByIdQuery(id ?? skipToken);

  const titleJapan = data?.data?.title_japanese;

  const watermark = titleJapan;

  return (
    <article className="anime-page__article">
      <p className="anime-page__watermark">{watermark}</p>
      <Content />
      <Characters />
      <Parameters />
      <Youtube />
    </article>
  );
};

export default Article;
