import { setCookie } from "h3";

export default async (event) => {
  setCookie(event, "auth_token", null);
  return "logout"
};
