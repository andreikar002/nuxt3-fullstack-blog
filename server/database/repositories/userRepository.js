import prisma from "../client";

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      nickname: true,
      email: true,
    },
  });
}
export async function getUserByNickname(nickname) {
  return await prisma.user.findUnique({
    where: {
      nickname: nickname,
    },
    select: {
      id: true,
      nickname: true,
      email: true,
    },
  });
}

export async function createUser(form) {
  const user = await prisma.user.create({
    data: {
      nickname: form.nickname,
      email: form.email,
      password: form.password,
    },
  });
  return user;
}

export async function checkUser(form) {
  return await prisma.user.findUnique({
    where: {
      email: form.email,
    },
    select: {
      id: true,
      nickname: true,
      password: true,
    },
  });
}
