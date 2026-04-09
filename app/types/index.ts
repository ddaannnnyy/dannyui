import type { InputTypeHTMLAttribute } from 'vue';

declare global {
  type EmptyString = string extends '' ? '' : never;
  type NullOrUndefined = EmptyString | null | undefined;
  type InputType = InputTypeHTMLAttribute;
  export interface IDropDownOption {
    id: string
    label: string
    emit: string
    highlighted?: boolean
  }
}

export { };
