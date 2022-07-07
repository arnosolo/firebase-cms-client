<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
  },
})
</script>

<template>
  <div class="border">
    {{title}}
  </div>
</template>

<style scoped>
</style>
