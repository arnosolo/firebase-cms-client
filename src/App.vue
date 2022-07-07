<script setup lang="ts">
import NavBar from './components/NavBar/index.vue'

</script>

<template>
  <div class="
    flex flex-col items-center
    h-screen w-screen overflow-x-hidden
    bg-bright-bg dark:bg-dark-bg
    text-bright-text dark:text-dark-text">
    <NavBar class="" />
    <div class="h-12"></div>
    <router-view class="w-full">
    </router-view>
  </div>
</template>

<style>
</style>
