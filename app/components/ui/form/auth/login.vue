<script setup lang="ts">
// TODO add commonly used social logins
type FormState = 'log-in' | 'reset-password' | 'sign-up';
type UsernameType = 'email' | 'username';
interface IFormValue {
  inputID: string
  valid?: boolean
  value?: string
}
export interface IFormAuthLoginProps {
  usernameType?: UsernameType
  debugUsername?: string
  debutPassword?: string
}
export interface IFormAuthLoginEmits {
  'submit': [value: void]
  'submit:event': [value: SubmitEvent]
  'submit:login': [value: IFormValue[]]
  'submit:reset-password': [value: IFormValue[]]
  'submit:sign-up': [value: IFormValue[]]
}

const props = withDefaults(
  defineProps<IFormAuthLoginProps>(),
  {
    usernameType: 'email'
  }
);
const emit = defineEmits<IFormAuthLoginEmits>();

const username = ref<string | undefined>(props.debugUsername);
const password = ref<string | undefined>(props.debutPassword);
const formState = ref<FormState>('log-in');

function handleSubmit(event: SubmitEvent) {
  emit('submit');
  emit('submit:event', event);
  emit('submit:login', [{
    inputID: 'username',
    value: username.value
  }, {
    inputID: 'password',
    value: password.value
  }] as IFormValue[]);
  emit('submit:reset-password', [{
    inputID: 'username',
    value: username.value
  }] as IFormValue[]);
  emit('submit:sign-up', [{
    inputID: 'username',
    value: username.value
  }, {
    inputID: 'password',
    value: password.value
  }] as IFormValue[]);
}
</script>

<template>
  <ui-form class="w-full" @submit="handleSubmit">
    <template v-if="formState === 'log-in'" #heading>
      <h1 class="text-xl">
        Login
      </h1>
    </template>
    <template v-else-if="formState === 'reset-password'" #heading>
      <h1 class="text-xl">
        Reset Password
      </h1>
    </template>
    <template v-else-if="formState === 'sign-up'" #heading>
      <h1 class="text-xl">
        Sign Up
      </h1>
    </template>
    <template v-if="formState === 'log-in'" #content>
      <ui-input-label name="username" :label="props.usernameType === 'email' ? 'Email' : 'Username'" required>
        <ui-input-common id="username" :value="username" required @input:value="username = $event" />
      </ui-input-label>
      <ui-input-label name="password" label="Password" required>
        <ui-input-password id="password" :value="password" required @input:value="password = $event" />
      </ui-input-label>
    </template>
    <template v-else-if="formState === 'reset-password'" #content>
      <ui-input-label name="username" :label="props.usernameType === 'email' ? 'Email' : 'Username'" required>
        <ui-input-common id="username" :value="username" required @input:value="username = $event" />
      </ui-input-label>
    </template>
    <template v-else-if="formState === 'sign-up'" #content>
      <ui-input-label name="username" :label="props.usernameType === 'email' ? 'Email' : 'Username'" required>
        <ui-input-common id="username" :value="username" required @input:value="username = $event" />
      </ui-input-label>
    </template>
    <template v-if="formState === 'log-in'" #footer>
      <button class="underline text-left" @click="formState = 'reset-password'">
        Forgot Password
      </button>
      <button class="underline text-left" @click="formState = 'sign-up'">
        Create an Account
      </button>
    </template>
    <template v-else #footer>
      <button class="underline text-left" @click="formState = 'log-in'">
        Back to Login
      </button>
    </template>
    <template v-if="formState === 'log-in'" #submit>
      <ui-button role="submit">
        Login
      </ui-button>
    </template>
    <template v-else-if="formState === 'reset-password'" #submit>
      <ui-button role="submit">
        Reset Password
      </ui-button>
    </template>
    <template v-else-if="formState === 'sign-up'" #submit>
      <ui-button role="submit">
        Sign Up
      </ui-button>
    </template>
  </ui-form>
</template>

<style scoped>

</style>
