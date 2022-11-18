<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useMoviesStore } from "@/stores/movies";
import { BaseCard, MovieCard } from "@/app.organizer";
import useMoviesTrend from "@/composables/useMoviesTrend";

const backgroundImage = ref("");
const moviesStore = useMoviesStore();
const { movies, loading, getTrend } = useMoviesTrend();

const moviesFavorites = computed(() => moviesStore.favorites);
const updateBackgroundImage = (imagePath: string) => {
  backgroundImage.value = imagePath;
};

onMounted(() => getTrend());
</script>

<template>
  <div class="flex flex-1 relative">
    <transition name="slide-fade" ease-out>
      <div
        v-if="backgroundImage !== ''"
        :key="backgroundImage"
        class="absolute z-0 w-full h-full opacity-30 transition-all duration-700 bg-cover bg-color-black"
        :src="backgroundImage"
        :style="{
          backgroundImage: 'url(' + backgroundImage + ')',
        }"
      />
    </transition>
    <div
      class="db-index z-20 pt-20 mx-auto w-5/6 max-w-screen-xl flex-1 flex justify-center items-center"
    >
      <BaseCard title="Mes Favoris" :external-title="true">
        <template v-if="moviesFavorites.length">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 a-07 fadeInUp"
          >
            <MovieCard
              v-for="(movie, index) in moviesFavorites"
              :key="'m-' + index"
              :data="movie"
              @onHover="updateBackgroundImage"
            />
          </div>
        </template>
        <div
          v-else
          class="text-2xl text-black dark:text-white w-100 text-center a-07 fadeInUp"
        >
          Aucun favoris trouvé
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="scss"></style>
