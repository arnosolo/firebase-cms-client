<template>
    <div class="file-picker">
        <input
            @change="handleFileChange"
            ref="filepicker"
            type="file"
            class="invisible w-0"
        />
        <button
            @click="selectFile"
            class="bg-blue-500 rounded-md px-5 py-1.5"
        >
            <p class="text-lg font-semibold text-slate-50">
                {{ text }}
            </p>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    defineProps<{
        text: string;
    }>();

    const emit = defineEmits(['file-change']);

    const filepicker = ref();

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
