import { getAllPublications } from "~~/server/database/repositories/publicationRepository";

export default async (event) => {
  const publications = await getAllPublications();
  return publications;
};
