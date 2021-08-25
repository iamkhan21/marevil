import { minPasswordLength, minUsernameLength } from "../../utils/validators";

export enum AuthErrors {}

export function generateCredentialError(type: string, value: string): string {
  let length = 0;
  switch (type) {
    case "username": {
      length = minUsernameLength;
      break;
    }
    case "password": {
      length = minPasswordLength;
      break;
    }
  }

  return `${type} should have at least ${length} characters. Please add ${
    length - value.length
  } symbols.`;
}
