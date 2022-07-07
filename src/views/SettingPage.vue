<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import i18n from "../locale/i18n";
import { regionConfig } from "../locale/regionConfig";
import { useFiles } from '../hooks/useFiles';
import { useTheme } from "../hooks/useTheme";
import FilePicker from '../components/FilePicker.vue'
import DragToUpload from '../components/DragToUpload/index.vue'

const { t } = useI18n();

const { files: selectedFiles, setFiles: setSelectedFiles } = useFiles();
function handleFileChange(newFiles: Array<File>) {
  setSelectedFiles(newFiles);
  console.log('selectedFiles', selectedFiles);
}


const { theme, setTheme } = useTheme()

function switchTheme() {
  if (theme.value === 'dark') {
    setTheme('bright')
  } else {
    setTheme('dark')
  }
}


</script>

<template>
  <div>
    <button
          @click="switchTheme"
          class="py-2 px-4 rounded-md
            bg-bright text-bright-contrastText
            dark:bg-dark dark:text-dark-contrastText">
          {{ `${theme} mode now` }}
        </button>
  </div>
</template>

<style scoped>
</style>
