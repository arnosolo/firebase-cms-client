<script setup lang="ts">
import { ref } from 'vue'
import { ArticleOption } from "../types/ArticleOption";

defineProps({
  articleOption: {
    type: ArticleOption,
    required: true,
  },
})
</script>

<template>
  <div class="px-3 shadow-sm border w-5/12 sm:w-64">
    <h3 class="text-2xl font-semibold">{{ articleOption.title }}</h3>
    <p>{{ articleOption.summary }}</p>
  </div>
</template>

<style scoped>
</style>
