import axios from "axios";

export interface Book {
  title: string;
  author: string;
  pages: number;
  year: number;
  genre: string;
  rating: number;
  link: string;
  image_url: string;
  description: string;
}

export const fetchRecommendations = async (query: string): Promise<Book[]> => {
  const response = await axios.get<Book[]>(
    "https://emeritus-21-oau-book-recommender.hf.space/recommend/query/",
    {
      params: {
        query,
        top_n: 10, // number of results
      },
    }
  );
  return response.data;
};
