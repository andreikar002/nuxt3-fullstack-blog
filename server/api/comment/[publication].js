import { getCookie } from "h3";
import { getUserBySessionToken } from "~~/server/services/sessionService";
import { getCommentsByPublication } from "~~/server/database/repositories/commentRepositpry";

export default async (event) => {
  const publicationId = parseInt(event.context.params.publication);
  const comments = await getCommentsByPublication(publicationId);
  return comments;
};
