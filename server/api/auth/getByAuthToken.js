import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";

export default async (event) => {
  // const body = await useBody(event);
  const authToken = getCookie(event, "auth_token");
  // console.log(authToken, "authToken");
  const user = await getUserBySessionToken(authToken);
  // console.log(user, "user");
  return user;
};
