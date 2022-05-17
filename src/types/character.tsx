type character = {
  id?: number;

  character?: {
    mal_id?: number;
    name?: string;
    images?: {
      webp?: {
        image_url?: string;
      };
    };
  };

  data?: any;
};

export default character;
