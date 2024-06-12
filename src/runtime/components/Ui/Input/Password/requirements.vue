<template>
  <div></div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<!-- <template>
  <div class="p-150 rounded border">
    <ul class="gap-50 flex flex-col">
      <li class="flex flex-row items-center justify-between">
        Is Valid
        <span
          class="material-symbols-rounded"
          v-if="returnPasswordCheck(password, challenge, illegalWords).isValid"
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        Is Valid Length
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords).isValidLength
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        containsNumber
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords)
              .containsNumber
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        containsLowercase
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords)
              .containsLowercase
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        containsUppercase
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords)
              .containsUppercase
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        containsSymbol
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords)
              .containsSymbol
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        matchesChallenge
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords)
              .matchesChallenge
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        containsIllegalWords
        <span
          class="material-symbols-rounded"
          v-if="
            returnPasswordCheck(password, challenge, illegalWords)
              .containsIllegalWords
          "
        >
          check
        </span>
      </li>
      <li class="flex flex-row items-center justify-between">
        illegal word errors here
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface PasswordValidity {
  readonly isValid: boolean;
  readonly isValidLength: boolean;
  readonly containsNumber: boolean;
  readonly containsLowercase: boolean;
  readonly containsUppercase: boolean;
  readonly containsSymbol: boolean;
  readonly containsIllegalWords: Array<IllegalWordCheck>;
  readonly matchesChallenge: boolean;
}

interface IllegalWordCheck {
  check: string | undefined;
  value: string;
  passes?: boolean;
}

const { password, challenge, illegalWords } = defineProps<{
  password: string;
  challenge: string;
  illegalWords: IllegalWordCheck[];
}>();

const passwordRequirements = reactive({
  isValid: false,
  isValidLength: false,
  containsNumber: false,
  containsLowercase: false,
  containsUppercase: false,
  containsSymbol: false,
  containsIllegalWords: [] as IllegalWordCheck[],
  matchesChallenge: false,
});

const returnPasswordCheck = (
  value: string,
  illegalWords: IllegalWordCheck[],
  challenge: string,
): PasswordValidity => {
  console.log(value, "password");
  let passwordConditions = {
    isValid: false,
    isValidLength: false,
    containsNumber: false,
    containsLowercase: false,
    containsUppercase: false,
    containsSymbol: false,
    containsIllegalWords: illegalWords,
    matchesChallenge: false,
  };

  try {
    if (
      illegalWords[illegalWords.length - 1].check !=
      "Your password cannot contain a space"
    ) {
      illegalWords.push({
        check: "Your password cannot contain a space",
        value: " ",
      });
    }
  } catch (error) {
    console.log(error);
  }

  passwordConditions.isValidLength = value.length >= 8;
  passwordConditions.containsNumber = /\d/.test(value);
  passwordConditions.containsLowercase = value.toUpperCase() !== value;
  passwordConditions.containsUppercase = value.toLowerCase() !== value;
  passwordConditions.containsSymbol =
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

  passwordConditions.matchesChallenge = value === challenge && value.length > 0;
  passwordConditions.isValid =
    passwordConditions.isValidLength &&
    passwordConditions.containsNumber &&
    passwordConditions.containsLowercase &&
    passwordConditions.containsUppercase &&
    passwordConditions.containsSymbol &&
    passwordConditions.matchesChallenge;

  try {
    illegalWords.forEach((check: any, index: number) => {
      passwordConditions.containsIllegalWords[index].passes = !value
        .toLocaleLowerCase()
        .includes(check.value.toLocaleLowerCase());
      if (passwordConditions.containsIllegalWords[index].passes === false) {
        passwordConditions.isValid = false;
      }
    });
  } catch (error) {}

  return passwordConditions;
};
</script>

<style scoped></style> -->
