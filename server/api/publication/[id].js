import { getPublicationById } from "~~/server/database/repositories/publicationRepository";

export default async (event) => {
  const id = parseInt(event.context.params.id);
  const publication = await getPublicationById(id);
  return publication;
};
