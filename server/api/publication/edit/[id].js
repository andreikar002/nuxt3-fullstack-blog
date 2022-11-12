import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";
import {
  editPublication,
  getPublicationById,
} from "~~/server/database/repositories/publicationRepository";

export default async (event) => {
  const id = parseInt(event.context.params.id);
  const body = await useBody(event);
  console.log(body, "body");
  const title = body.title;
  const text = body.text;
  const newPublication = {
    title: title,
    text: text,
  };
  const authToken = getCookie(event, "auth_token");
  console.log(id, "authToken");
  const user = await getUserBySessionToken(authToken);
  const publication = await getPublicationById(id);
  console.log(user, publication, "authToken");
  if (user && user.id == publication.authorId) {
    return await editPublication(id, newPublication);
  } else {
    sendError(
      event,
      createError({ statusCode: 422, statusMessage: "Unauthorized!" })
    );
  }
};
