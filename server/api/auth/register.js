import { sendError } from "h3";
import bcrypt from "bcrypt";
import { isUserExits } from "~~/server/services/userService";
import { createUser } from "~~/server/database/repositories/userRepository";
import { makeSession } from "~~/server/services/sessionService";

export default async (event) => {
  const body = await useBody(event);
  const nickname = body.nickname;
  const email = body.email;
  const password = body.password;

  const userExists = await isUserExits(email, nickname);

  if (userExists.value === true) {
    sendError(
      event,
      createError({ statusCode: 422, statusMessage: userExists.message })
    );
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData = {
    nickname,
    email,
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  return await makeSession(user, event);
};
