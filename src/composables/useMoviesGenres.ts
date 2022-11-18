import { TMovieData } from "@/types/movies";
import axios from "axios";
import { ref } from "vue";
const movieDbURL = "https://api.themoviedb.org/3/";
const apiKey = import.meta.env.VITE_DBMOVIE_API_KEY;

const useMoviesGenres = () => {
  const movies = ref<TMovieData[]>([]);
  const error = ref("");
  const loading = ref(false);
  const currentPage = ref(1);
  const end = ref(false);

  const getGenre = async (genre: number[], page: number = 1) => {
    loading.value = true;
    axios
      .get(
        `${movieDbURL}discover/movie?api_key=${apiKey}${
          !genre.includes(0) ? "&with_genres=" + genre.join("|") : ""
        }&page=${page}`
      )
      .then((res) => {
        if (res.status === 200) {
          if (page <= currentPage.value) movies.value = res.data.results;
          else movies.value = movies.value.concat(res.data.results);
          if (res.data.total_pages === page) end.value = true;
          else end.value = false;

          currentPage.value = page;
        }
        loading.value = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { movies, error, loading, end, currentPage, getGenre };
};

export default useMoviesGenres;
