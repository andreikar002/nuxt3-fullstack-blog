import { getPublicationsByAuthor } from "~~/server/database/repositories/publicationRepository";

export default async (event) => {
  const author = event.context.params.author;
  const publications = await getPublicationsByAuthor(author);
  return publications;
};
