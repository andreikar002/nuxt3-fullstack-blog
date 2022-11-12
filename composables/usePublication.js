export async function createPublication(form) {
  const data = await useAPI("/api/publication/create", {
    method: "POST",
    body: form,
  });
  if (data) return data;
}

export async function getAllPublications() {
  const data = await useAPI("/api/publication/all");
  if (data) return data;
}

export async function getPublicationById(id) {
  const data = await useAPI(`/api/publication/${id}`);
  if (data) return data;
}

export async function getPublicationsByAuthor(author) {
  const data = await useAPI(`/api/publication/author/${author}`);
  if (data) return data;
}

export async function getMyPublications() {
  if (useState("user")) {
    const data = await useAPI(
      `/api/publication/author/${useState("user").value.nickname}`
    );
    if (data) return data;
  }
}

export async function deletePublication(id) {
  if (useState("user")) {
    const data = await useAPI(`/api/publication/delete/${id}`);
    if (data) return data;
  }
}

export async function editPublication(id, form) {
  if (useState("user")) {
    const data = await useAPI(`/api/publication/edit/${id}`, {
      body: form,
      method: "PUT",
    });
    if (data) return data;
  }
}
