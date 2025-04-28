const BASE_URL = "https://notes73-525072028648.us-central1.run.app";

// Ambil elemen form
const formulir = document.querySelector("form");
const inputId = document.querySelector("#note-id");
const inputNama = document.querySelector("#nama");
const inputJudul = document.querySelector("#judul");
const inputCatatan = document.querySelector("#catatan");

// Tambahkan event listener untuk submit form
formulir.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const id = inputId.value;
  const nama = inputNama.value;
  const judul = inputJudul.value;
  const catatan = inputCatatan.value;

  try {
    if (!nama || !judul || !catatan) {
      alert("Semua field harus diisi!");
      return;
    }

    if (id === "") {
      await axios.post(`${BASE_URL}/tambahdata`, { nama, judul, catatan });
    } else {
      await axios.put(`${BASE_URL}/edit-user/${id}`, { nama, judul, catatan });
    }

    resetForm();
    getNotes();
  } catch (error) {
    console.error("Gagal menyimpan data:", error.message);
  }
});

// Fungsi untuk GET semua notes
async function getNotes() {
  try {
    const { data } = await axios.get(`${BASE_URL}/user`);
    
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

// Fungsi untuk menampilkan catatan dalam tabel
function tampilkanNotes(no, note) {
  return `
    <tr>
      <td>${no}</td>
      <td class="nama">${note.nama}</td>
      <td class="judul">${note.judul}</td>
      <td class="catatan">${note.catatan}</td>
      <td><button data-id=${note.id} class='btn-edit'>Edit</button></td>
      <td><button data-id=${note.id} class='btn-hapus'>Hapus</button></td>
    </tr>
  `;
}

// Fungsi untuk menghapus catatan dengan konfirmasi
function hapusNotes() {
  document.querySelectorAll(".btn-hapus").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!confirm("Apakah Anda yakin ingin menghapus catatan ini?")) return;
      try {
        await axios.delete(`${BASE_URL}/delete-user/${btn.dataset.id}`);
        getNotes();
      } catch (error) {
        console.error("Gagal menghapus data:", error.message);
      }
    });
  });
}

// Fungsi untuk mengedit catatan
function editNotes() {
  document.querySelectorAll(".btn-edit").forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
      const id = tombol_edit.dataset.id;
      const row = tombol_edit.parentElement.parentElement;

      inputId.value = id;
      inputNama.value = row.querySelector(".nama").innerText;
      inputJudul.value = row.querySelector(".judul").innerText;
      inputCatatan.value = row.querySelector(".catatan").innerText;
    });
  });
}

// Fungsi untuk mereset form
function resetForm() {
  inputId.value = "";
  inputNama.value = "";
  inputJudul.value = "";
  inputCatatan.value = "";
}

// Panggil fungsi getNotes() untuk menampilkan data saat pertama kali halaman dimuat
getNotes();
