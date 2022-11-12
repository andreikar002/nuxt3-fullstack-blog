import { sendError } from "h3";
import bcrypt from "bcrypt";
import { isUserExits } from "~~/server/services/userService";
import { checkUser } from "~~/server/database/repositories/userRepository";
import { makeSession } from "~~/server/services/sessionService";

export default async (event) => {
  const body = await useBody(event);
  //   const nickname = body.nickname;
    // console.log(body, "body in email");
  const email = body.email;
  const password = body.password;
  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email: email,
    password: encryptedPassword,
  };

  const user = await checkUser(userData);
  console.log(user, "user from DB", encryptedPassword);
  const isCorrect = await bcrypt.compare(password, user.password);
  if (isCorrect) return await makeSession(user, event);
  else {
    sendError(
      event,
      createError({ statusCode: 422, statusMessage: "User not found!" })
    );
  }
};
