import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";
import { createPublication } from "~~/server/database/repositories/publicationRepository";

export default async (event) => {
  const body = await useBody(event);
  const title = body.title;
  const text = body.text;
  const authToken = getCookie(event, "auth_token");
  // console.log(authToken, "authToken");
  const author = await getUserBySessionToken(authToken);

  const publicationForm = {
    title: title,
    text: text,
    authorId: author.id,
  };
  // console.log(publicationForm, "publicationForm");
  const publication = await createPublication(publicationForm);
  return publication;
};
