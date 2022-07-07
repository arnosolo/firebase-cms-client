<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
  <div class="flex flex-col justify-center items-center pt-12 gap-4">
    <h1 class="text-4xl">Page not found</h1>
    <p class="text-lg">
      <span>You can choose </span>
      <span class="underline" @click="router.push('/')">go home</span>
    </p>
  </div>
</template>

<style scoped>
</style>
