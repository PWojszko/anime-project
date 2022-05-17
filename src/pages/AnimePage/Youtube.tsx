import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";

//types
import anime from "../../types/anime";

// redux
import { useGetAnimeByIdQuery } from "../../redux/api";

const Youtube = () => {
  const params: anime = useParams();
  const id = params?.id;

  const { data, error, isLoading } = useGetAnimeByIdQuery(id ?? skipToken);

  const ytUrl = data?.data?.trailer?.embed_url;

  return (
    <div className="anime-page__video">
      <iframe
        src={ytUrl}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Youtube;
