<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BaseCard, MovieCard } from "@/app.organizer";
import useMoviesTrend from "@/composables/useMoviesTrend";

const backgroundImage = ref("");
const { movies, loading, getTrend } = useMoviesTrend();
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
      <BaseCard title="En ce moment" :external-title="true">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <MovieCard
            v-for="(movie, index) in movies"
            :key="'m-' + index"
            class="a-03 fadeInUp"
            :class="'d-' + index * 100"
            :data="movie"
            @onHover="updateBackgroundImage"
          />
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="scss"></style>
