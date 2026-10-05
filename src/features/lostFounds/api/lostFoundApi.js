import apiHelper from "../../../helpers/apiHelper";

const lostFoundApi = (() => {
  const BASE_URL = `${DELCOM_BASEURL}/lost-founds`;

  function _url(path) {
    return BASE_URL + path;
  }

  async function postLostFound(title, description, status) {
    const response = await apiHelper.fetchData(_url("/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });
    const result = await response.json();
    if (result.status !== "success" && !result.success) {
      throw new Error(result.message || "Gagal menambahkan laporan");
    }
    return result.data;
  }

  async function postLostFoundCover(id, cover) {
    const formData = new FormData();
    formData.append("cover", cover, cover.name || "cover.jpg");
    const response = await apiHelper.fetchData(_url(`/${id}/cover`), {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (result.status !== "success" && !result.success) {
      throw new Error(result.message || "Gagal mengubah cover");
    }
    return result.message;
  }

  async function putLostFound(id, title, description, status, is_completed) {
    const response = await apiHelper.fetchData(_url(`/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        status,
        is_completed: is_completed ? 1 : 0,
      }),
    });
    const result = await response.json();
    if (result.status !== "success" && !result.success) {
      throw new Error(result.message || "Gagal mengubah laporan");
    }
    return result.message;
  }

  async function getLostFounds({ is_completed, status } = {}) {
    const query = new URLSearchParams();
    if (is_completed !== undefined && is_completed !== "" && is_completed !== null) {
      query.set("is_completed", String(is_completed));
    }
    if (status) query.set("status", status);
    const qs = query.toString();
    const targetUrl = qs ? `/?${qs}` : "/";

    const response = await apiHelper.fetchData(_url(targetUrl), { method: "GET" });
    const result = await response.json();
    if (result.status !== "success" && !result.success) {
      throw new Error(result.message || "Gagal mengambil data laporan");
    }
    return result.data?.lost_founds || [];
  }

  async function getLostFoundById(id) {
    const response = await apiHelper.fetchData(_url(`/${id}`), { method: "GET" });
    const result = await response.json();
    if (result.status !== "success" && !result.success) {
      throw new Error(result.message || "Gagal mengambil detail laporan");
    }
    return result.data?.lost_found || result.data;
  }

  async function deleteLostFound(id) {
    const response = await apiHelper.fetchData(_url(`/${id}`), { method: "DELETE" });
    const result = await response.json();
    if (result.status !== "success" && !result.success) {
      throw new Error(result.message || "Gagal menghapus laporan");
    }
    return result.message;
  }

  return {
    postLostFound,
    postLostFoundCover,
    putLostFound,
    getLostFounds,
    getLostFoundById,
    deleteLostFound,
  };
})();

export default lostFoundApi;
