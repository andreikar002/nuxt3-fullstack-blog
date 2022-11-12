export async function createComment(form) {
  const data = await $fetch(`/api/comment/create/${form.publicationId}`, {
    method: "POST",
    body: form,
    headers: useRequestHeaders(["cookie"]),
  });
  if (data) return data;
}

export async function getCommentsByPublication(publicationId) {
  const data = await $fetch(`/api/comment/${publicationId}`, {
    headers: useRequestHeaders(["cookie"]),
  });
  if (data) return data;
}
