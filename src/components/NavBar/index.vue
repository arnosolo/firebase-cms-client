<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import DarkModeSwitch from "../DarkModeSwitch.vue";

const router = useRouter()

const showMenuDetail = ref(false)
function toggleShowMenuDetial() {
  showMenuDetail.value = !showMenuDetail.value
}

const menuOptions = reactive(['Search', 'Setting', 'Account'])
</script>

<template>
  <div class="
    w-full flex justify-between">
    <div class="
      fixed w-full shadow-md h-12 px-4
      bg-bright dark:bg-dark
      text-bright-contrastText dark:text-dark-contrastText
      flex justify-between items-center">

      <!-- Home Button -->
      <svg t="1656203627620" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        class="h-9 w-9 fill-bright-contrastText dark:fill-dark-contrastText active:scale-95" p-id="1256"
        @click="router.push('/')">
        <path
          d="M267.168 454.624v316.48h152V598.224c0-6.144 4.992-11.12 11.136-11.12h169.728c6.16 0 11.136 4.976 11.136 11.12v172.88h136V453.6l-239.36-188.848-240.64 189.856z m-48 37.872l-39.36 31.04a16 16 0 0 1-22.464-2.656l-9.904-12.56a16 16 0 0 1 2.656-22.464l347.792-274.416a16 16 0 0 1 19.84 0l347.792 274.4a16 16 0 0 1 2.656 22.48l-9.92 12.56a16 16 0 0 1-22.464 2.656l-40.624-32.048v292.48a35.136 35.136 0 0 1-35.136 35.136H254.304a35.136 35.136 0 0 1-35.136-35.136V492.496z m248 270.608h96v-128h-96v128z"
          p-id="1257"></path>
      </svg>

      <!-- Menu Button -->
      <svg t="1656208470917" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4225"
        class="sm:hidden w-8 h-8 fill-bright-contrastText dark:fill-dark-contrastText active:scale-95"
        @click="toggleShowMenuDetial" v-if="showMenuDetail">
        <path d="M887.475 762.313 512 386.843l-375.474 375.47L73.947 699.74 512 261.687 950.053 699.74 887.475 762.313z"
          p-id="4226"></path>
      </svg>
      <svg t="1656204389778" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3159"
        class="sm:hidden w-8 h-8 fill-bright-contrastText dark:fill-dark-contrastText active:scale-95"
        @click="toggleShowMenuDetial" v-else>
        <path
          d="M128 256h768v85.333333H128V256m0 213.333333h768v85.333334H128v-85.333334m0 213.333334h768v85.333333H128v-85.333333z"
          p-id="3160"></path>
      </svg>

      <!-- Menu Buttons -->
      <div class="hidden sm:flex items-center gap-4 text-xl">
        <p v-for="opt of menuOptions">{{ opt }}</p>
        <DarkModeSwitch />
      </div>
    </div>

    <!-- Hidden Menu List -->
    <div v-if="showMenuDetail" class="">
      <div class="h-12"></div>
      <div class="flex flex-col px-4 py-2 gap-2">
        <p v-for="opt of menuOptions" class="text-xl">
          {{ opt }}
        </p>
        <DarkModeSwitch />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
