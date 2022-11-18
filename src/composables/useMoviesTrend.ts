import axios from "axios";
import { ref } from "vue";
const movieDbURL = "https://api.themoviedb.org/3/";
const apiKey = import.meta.env.VITE_DBMOVIE_API_KEY;

const useMoviesTrend = () => {
  const movies = ref([]);
  const error = ref("");
  const loading = ref(false);

  const getTrend = async () => {
    loading.value = true;
    axios
      .get(`${movieDbURL}movie/popular?api_key=${apiKey}`)
      .then((res) => {
        if (res.status === 200) {
          movies.value = res.data.results.slice(0, 4);
        }
        loading.value = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { movies, error, loading, getTrend };
};

export default useMoviesTrend;
