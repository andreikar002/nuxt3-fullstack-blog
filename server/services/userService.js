import {
  getUserByEmail,
  getUserByNickname,
} from "~/server/database/repositories/userRepository";

export async function isUserExits(email, nickname) {
  const hasEmail = await getUserByEmail(email);
  const hasNickname = await getUserByNickname(email);
  const emailExist = hasEmail !== null;
  const nicknameExist = hasNickname !== null;

  const errors = {};

  if (emailExist) {
    errors.emailError = `This email, ${email}, is already registred!`;
  }
  if (nicknameExist) {
    errors.nicknameError = `This nickname, ${nickname}, is already registred!`;
  }

  if (emailExist || nicknameExist) {
    const message = JSON.stringify(errors);
    return { value: true, message };
  }

  return { value: false };
}
