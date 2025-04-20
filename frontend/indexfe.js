const BASE_URL = "http://localhost:5000";

const formulir = document.querySelector("form");
const inputId = document.querySelector("#note-id");
const inputJudul = document.querySelector("#judul");
const inputCatatan = document.querySelector("#catatan");

formulir.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const id = inputId.value;
  const judul = inputJudul.value;
  const catatan = inputCatatan.value;

  try {
    if (!judul || !catatan) {
      alert("Semua field harus diisi!");
      return;
    }

    if (id === "") {
      await axios.post(`${BASE_URL}/users`, { judul, catatan });
    } else {
      await axios.patch(`${BASE_URL}/users/${id}`, { judul, catatan });
    }

    resetForm();
    getNotes();
  } catch (error) {
    console.error("Gagal menyimpan data:", error.message);
  }
});

async function getNotes() {
  try {
    const { data } = await axios.get(`${BASE_URL}/users`);
    const table = document.querySelector("#table-notes");
    let tampilan = "";
    let no = 1;

    for (const note of data) {
      tampilan += tampilkanNotes(no++, note);
    }

    table.innerHTML = tampilan;
    hapusNotes();
    editNotes();
  } catch (error) {
    console.error("Gagal mengambil data:", error.message);
  }
}

function tampilkanNotes(no, note) {
  return `
    <tr>
      <td>${no}</td>
      <td class="judul">${note.judul}</td>
      <td class="catatan">${note.catatan}</td>
      <td>
        <button data-id=${note.id} class='btn-edit'>Edit</button>
        <button data-id=${note.id} class='btn-hapus'>Hapus</button>
      </td>
    </tr>
  `;
}

function hapusNotes() {
  document.querySelectorAll(".btn-hapus").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!confirm("Yakin mau hapus catatan ini?")) return;
      try {
        await axios.delete(`${BASE_URL}/users/${btn.dataset.id}`);
        getNotes();
      } catch (error) {
        console.error("Gagal menghapus data:", error.message);
      }
    });
  });
}

function editNotes() {
  document.querySelectorAll(".btn-edit").forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
      const id = tombol_edit.dataset.id;
      const row = tombol_edit.parentElement.parentElement;

      inputId.value = id;
      inputJudul.value = row.querySelector(".judul").innerText;
      inputCatatan.value = row.querySelector(".catatan").innerText;
    });
  });
}

function resetForm() {
  inputId.value = "";
  inputJudul.value = "";
  inputCatatan.value = "";
}

getNotes();
