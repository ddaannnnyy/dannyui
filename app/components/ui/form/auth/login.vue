<script setup lang="ts">
// TODO add commonly used social logins

type UsernameType = 'email' | 'username';
export interface IFormAuthLoginProps {
  usernameType?: UsernameType
}

const props = withDefaults(
  defineProps<IFormAuthLoginProps>(),
  {
    usernameType: 'email'
  }
);

const formData = reactive({
  username: '',
  password: '',
});
</script>

<template>
  <ui-form class="w-full">
    <template #heading>
      <h1 class="text-xl">
        Login
      </h1>
    </template>
    <template #content>
      <ui-input-label name="username" :label="props.usernameType === 'email' ? 'Email' : 'Username'">
        <ui-input-common id="username" />
      </ui-input-label>
    </template>
  </ui-form>
</template>

<style scoped>

</style>
