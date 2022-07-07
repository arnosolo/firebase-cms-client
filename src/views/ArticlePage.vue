<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
const articleId = route.params.id

</script>

<template>
<h1>Article {{articleId}}</h1>
</template>

<style scoped>
</style>
