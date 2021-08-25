export const minPasswordLength = 8;
export const minUsernameLength = 6;

export function isLengthValid(s: string, length: number): boolean {
  return s.length >= length;
}

export function checkPasswordMinLength(password: string): boolean {
  return isLengthValid(password, minPasswordLength);
}

export function checkUsernameMinLength(username: string): boolean {
  return isLengthValid(username, minUsernameLength);
}
