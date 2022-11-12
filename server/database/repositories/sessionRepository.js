import prisma from "../client";

export async function createSession(form) {
  return await prisma.session.create({
    data: {
      userId: form.userId,
      authToken: form.authToken,
    },
  });
}

export async function getSessionByAuthToken(authToken) {
  const user = await getUserByAuthToken(authToken);
  return { authToken, user };
}

export async function getUserByAuthToken(authToken) {
  return prisma.session
    .findUnique({
      where: {
        authToken: authToken,
      },
    })
    .user({ select: { nickname: true, email: true, id: true } });
}
