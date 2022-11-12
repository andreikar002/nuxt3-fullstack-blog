import prisma from "../client";

export async function createPublication(form) {
  return await prisma.publication.create({
    data: {
      authorId: form.authorId,
      text: form.text,
      title: form.title,
    },
  });
}

export async function getAllPublications() {
  return await prisma.publication.findMany({
    orderBy: { createdAt: "asc" },
    include: { author: { select: { nickname: true, id: true } } },
  });
}

export async function getPublicationById(id) {
  return await prisma.publication.findUnique({
    where: { id: id },
    include: { author: { select: { nickname: true, id: true } } },
  });
}

export async function getPublicationsByAuthor(nick) {
  return await prisma.user
    .findUnique({
      where: { nickname: nick },
    })
    .publications({include: { author: { select: { nickname: true, id: true } } },});
}

export async function deletePublication(id) {
  return await prisma.publication.delete({
    where: {
      id: id,
    },
  });
}

export async function editPublication(id, form) {
  return await prisma.publication.update({
    where: {
      id: id,
    },
    data: {
      title: form.title,
      text: form.text,
    },
  });
}
