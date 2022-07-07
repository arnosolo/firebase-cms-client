import { reactive } from 'vue';

export function useFiles() {
    const files = reactive<Array<File>>([]);
    function setFiles(newFiles: Array<File>) {
        files.length = 0;
        for (let f of newFiles) {
            files.push(f);
        }
    }

    return {
        files,
        setFiles,
    };
}