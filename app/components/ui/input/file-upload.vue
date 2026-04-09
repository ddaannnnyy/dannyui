<script setup lang="ts">
export type AcceptFileType = `${string}/${string}`;
export type UploadErrorType = 'type' | 'size';

export interface IInputFileUploadProps {
  name: string
  accept?: AcceptFileType | Array<AcceptFileType>
  directory?: boolean
  multiple?: boolean
  resetOnCapture?: boolean
  limitMB?: number
  required?: boolean
}

export interface IInputFileUploadEmits {
  upload: [value: File[] | null]
  cancel: []
  dropzone: [value: boolean]
  error: [value: string[]]
}

const props = defineProps<IInputFileUploadProps>();
const emit = defineEmits<IInputFileUploadEmits>();

const { name, accept, directory, multiple, resetOnCapture, limitMB, required } = toRefs(props);
const dropzone = useTemplateRef('dropzone');
const fileList = ref<File[]>([]);
const errorList = ref<string[]>([]);

const barebones = useLayerOptions('barebones');

const computedAccept = computed(() => {
  if (Array.isArray(accept.value))
    return '*/*';
  return accept.value as string;
});

const { open, onCancel, onChange } = useFileDialog({
  accept: computedAccept.value,
  multiple: multiple.value,
  directory: directory.value,
  reset: resetOnCapture.value
});

const { isOverDropZone } = useDropZone(dropzone, {
  onDrop
});

onChange((files) => {
  if (!files)
    return;
  if (!fileList.value) {
    fileList.value = [];
  }
  for (let index = 0; index < files.length; index++) {
    if (fileTypeAllowed(files[index] as File)) {
      if (isFileUnderSizeLimit(files[index] as File)) {
        fileList.value?.push(files.item(index) as File);
      }
      else {
        errorList.value?.push(`Error Uploading ${(files[index] as File).name}. File size above limit.`);
      }
    }
    else {
      errorList.value?.push(`Error Uploading ${(files[index] as File).name} - .${(files[index] as File).type.split('/')[1] ?? (files[index] as File).type} is not an accepted file type.`);
    }
  }
  emit('upload', fileList.value);
});

onCancel(() => {
  emit('cancel');
});

const fileTypeList = computed(() => {
  if (!accept.value)
    return undefined;
  if (Array.isArray(accept.value)) {
    const list: string[] = [];
    accept.value.forEach((type) => {
      // Checks for patterns like image/* which will return images
      // Where as image/png will return 'png'
      const split = type.split('/');
      if (split[1] === '*') {
        list.push(returnPluralized((split[0] as string), 2) ?? '');
      }
      else {
        list.push(returnCapitalized(split[1] ?? '') as string);
      }
    });
    return `${returnCapitalized(returnArrayToList(list))} files`;
  }
  else {
    const splitType = accept.value.split('/');
    if (splitType[1] === '*') {
      return `${returnCapitalized(splitType[0])} files`;
    }
    else {
      return `${returnCapitalized(splitType[1])} files`;
    }
  }
});

const classStyles = computed(() => {
  if (!barebones)
    return [];
  return ['h-full border border-dashed rounded min-h-32 flex items-center justify-center transition-colors duration-300 hover:bg-slate-200'];
});

watch(() => fileList.value, (newValue) => {
  errorList.value = [];
  emit('upload', newValue);
});

watch(() => isOverDropZone.value, (newValue) => {
  emit('dropzone', newValue);
});

watch(() => errorList.value, (newValue) => {
  emit('error', newValue);
});

function onDrop(files: File[] | null) {
  errorList.value = [];
  if (!files)
    return;
  files.forEach((file) => {
    if (fileTypeAllowed(file)) {
      if (isFileUnderSizeLimit(file)) {
        fileList.value?.push(file);
        emit('upload', fileList.value);
      }
      else {
        errorList.value?.push(`File size above limit - Error Uploading ${file.name}`);
      }
    }
    else {
      errorList.value?.push(`Not an accepted file type - Error Uploading ${file.name}`);
    }
  });
};

function removeFileFromList(fileIndex: number) {
  fileList.value = fileList.value?.filter((_, index) => index !== fileIndex) ?? null;
};

function fileTypeAllowed(file: File) {
  if (!accept.value)
    return true;
  if (accept.value === '*/*')
    return true;
  let allowed = false;
  if (Array.isArray(accept.value)) {
    // exits when it finds an acceptable file type
    allowed = accept.value.some((type) => {
      const acceptAttributes = type.split('/');
      const fileTypeAttributes = file.type.split('/');
      return acceptAttributes[0] === fileTypeAttributes[0]
        && (acceptAttributes[1] === '*' || acceptAttributes[1] === fileTypeAttributes[1]);
    });
  }
  else {
    const acceptAttributes = accept.value.split('/');
    const fileTypeAttributes = file.type.split('/');

    if (acceptAttributes[0] === fileTypeAttributes[0]) {
      if (acceptAttributes[1] === '*')
        return true;
      if (acceptAttributes[1] === fileTypeAttributes[1])
        return true;
    }
    else {
      allowed = false;
    }
  }
  return allowed;
};

function isFileUnderSizeLimit(file: File) {
  if (!file.size)
    return true;
  return file.size <= convertMegabytesToBytes(Number.parseFloat(limitMB.value?.toString() ?? '25')); // 25MB Default
};

function convertMegabytesToBytes(size: number) {
  return size * (1024 * 1024);
}
</script>

<template>
  <div class="h-full flex flex-col gap-1 relative">
    <button
      ref="dropzone"
      v-bind="$attrs"
      :class="[isOverDropZone ? 'bg-slate-200' : '', classStyles]" @click.prevent="() => open()"
    >
      <slot name="drop-zone">
        <div class="text-center max-w-xs flex flex-col items-center gap-2">
          <div class="h-5 w-5 aspect-square flex items-center justify-center rounded-full p-4">
            <ui-custom-icon icon="stacks" />
          </div>
          <p v-if="!isOverDropZone" class="text-sm">
            {{ multiple ? 'Click Here or Drop your files to upload' : 'Click Here or Drop a file to upload' }}
          </p>
          <p v-else class="text-sm">
            Upload
          </p>
          <input
            v-if="required && (!fileList || fileList?.length === 0)" :id="`${name}-required-check`"
            :name="`${name}-required-check`" required aria-hidden="true" class="h-1 opacity-0"
          >
          <p class="text-sm text-text-teriary">
            {{ fileTypeList }} (Max {{ limitMB ?? 25 }}MB)
          </p>
        </div>
      </slot>
    </button>
    <slot name="error">
      <ul v-if="errorList.length > 0" class="flex flex-col gap-2">
        <li v-for="error in errorList" :key="`${useId()}-${error}`">
          {{ error }}
        </li>
      </ul>
    </slot>
    <slot name="file-list">
      <TransitionGroup v-if="fileList.length > 0" tag="ul" name="list" class="flex flex-col gap-2">
        <li
          v-for="file, index in fileList" :key="`${index}-${file.name}`"
          class="flex flex-row items-center justify-start gap-1 rounded border border-border-base p-3"
        >
          <div class="h-9 w-9 aspect-square flex items-center justify-center rounded-full bg-rblue-base">
            <ui-custom-icon icon="file_present" />
          </div>
          <div class="h-full grow flex flex-col text-xs">
            <p>{{ file.name }}</p>
            <p class=" text-text-teriary">
              {{ Math.round(file.size / 1024) }}KB
            </p>
          </div>
          <button class="flex items-center justify-center" @click="removeFileFromList(index)">
            <ui-custom-icon
              icon="close"
              class="text-text-teriary transition-colors duration-100 hover:text-text-base"
            />
          </button>
        </li>
      </TransitionGroup>
    </slot>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
    width: 100%;
}
</style>
