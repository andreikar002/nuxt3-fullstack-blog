import {
  createSession,
  getSessionByAuthToken,
} from "~~/server/database/repositories/sessionRepository";
import { v4 as uuidv4 } from "uuid";

export async function makeSession(user, event) {
  const authToken = uuidv4().replaceAll("-", "");
  const session = await createSession({ authToken, userId: user.id });
  const userId = session.userId;
  if (userId) {
    setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true });
    return getUserBySessionToken(authToken);
  }

  throw Error("error Creating Session");
}

export async function getUserBySessionToken(authToken) {
  const session = await getSessionByAuthToken(authToken);
  // console.log(session, "session");
  return session.user;
}
