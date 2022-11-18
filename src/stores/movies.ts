import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { TMovieData } from "@/types/movies";
import { LOCALSTORAGE_MOVIES_FAVORITES } from "@/app.storages";

export const useMoviesStore = defineStore({
  id: "movies",

  state: () => ({
    favorites: localStorage.getItem(LOCALSTORAGE_MOVIES_FAVORITES)
      ? (JSON.parse(
          localStorage.getItem(LOCALSTORAGE_MOVIES_FAVORITES) as string
        ) as TMovieData[])
      : ([] as TMovieData[]),
  }),

  actions: {
    addFavorite(movie: TMovieData) {
      this.favorites.push(movie);
      localStorage.setItem(
        LOCALSTORAGE_MOVIES_FAVORITES,
        JSON.stringify(this.favorites)
      );
    },

    removeFavorite(movie: TMovieData) {
      this.favorites = this.favorites.filter(
        (e: TMovieData) => e.id !== movie.id
      );
      localStorage.setItem(
        LOCALSTORAGE_MOVIES_FAVORITES,
        JSON.stringify(this.favorites)
      );
    },
  },
});
