import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";
import { deletePublication, getPublicationById } from "~~/server/database/repositories/publicationRepository";

export default async (event) => {
    const id = parseInt(event.context.params.id);
    const authToken = getCookie(event, "auth_token");
    console.log(id, "authToken");
    const user = await getUserBySessionToken(authToken);
    const publication = await getPublicationById(id);
    console.log(user, publication, "authToken");
    if (user && user.id == publication.authorId) {
      await deletePublication(id);
      return "deleted";
    } else {
      sendError(
        event,
        createError({ statusCode: 422, statusMessage: "Unauthorized!" })
      );
    }
};
