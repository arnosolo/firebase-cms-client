<template>
    <div ref="drag_area" @click="selectFile"
        class="flex gap-5 w-64 px-6 py-8 rounded-md border-dashed border border-indigo-600 hover:border-red-600">
        <img src="./upload-gray-600.svg" class="w-5" alt="upload-indigo-600">
        <p class="text-lg text-gray-800">
            {{ text }}
            {{ msg }}
        </p>
        <input @change="handleFileChange" ref="filepicker" type="file" class="invisible w-0" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
    text: string;
}>();

// accept="audio/mp3"
const emit = defineEmits(['file-change']);

const filepicker = ref();
const drag_area = ref<HTMLDivElement>();
const msg = ref('')

onMounted(() => {
    const dragAreaEle = drag_area.value;
    if (dragAreaEle) {
        dragAreaEle.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if(e.dataTransfer) {
                e.dataTransfer.dropEffect = 'copy';
            }
        });
        dragAreaEle.addEventListener("drop", function (e) {
            e.stopPropagation();
            e.preventDefault();
            if(e.dataTransfer) {
                const files = e.dataTransfer.files;
                emit('file-change', files);
            }
        });
    } else {
        console.log('cant find drop-area ');
    }
})

function selectFile() {
    filepicker.value?.click();
}

async function handleFileChange() {
    const { files } = filepicker.value;
    emit('file-change', files);
}
</script>

<style scoped>
</style>
