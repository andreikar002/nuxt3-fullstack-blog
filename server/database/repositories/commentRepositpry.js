import prisma from "../client";

export async function createComment(form) {
  return await prisma.comment.create({
    data: {
      authorId: form.authorId,
      text: form.text,
      publicationId: form.publicationId,
    },
  });
}

export async function getCommentsByPublication(publicationId) {
  return await prisma.comment.findMany({
    where: {
      publicationId: publicationId,
    },
    include: {
      author: { select: { nickname: true, id: true } },
    //   publication: {
    //     select: {
    //       publicationId: true,
    //       text: true,
    //     },
    //   },
    },
  });
}
