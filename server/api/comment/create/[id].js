import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";
import { createComment } from "~~/server/database/repositories/commentRepositpry";

export default async (event) => {
  const publicationId = parseInt(event.context.params.id);
  const authToken = getCookie(event, "auth_token");
  const body = await useBody(event);
  const text = body.text;
  console.log(body, "authToken");
  const user = await getUserBySessionToken(authToken);
  const commentForm = {
    authorId: parseInt(user.id),
    publicationId: publicationId,
    text: text,
  };
  if (user) {
    const comment = await createComment(commentForm);
    return comment;
  } else {
    sendError(
      event,
      createError({ statusCode: 422, statusMessage: "Unauthorized!" })
    );
  }
};
