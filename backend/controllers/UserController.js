import user from "../models/usermodel.js";

// Get user
export const getuser = async (req, res) => {
    try {
        const response = await user.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Create user
export const createuser = async (req, res) => {
    try {
        const { nama, judul, catatan } = req.body;
        if (!nama || !judul || !catatan) {
            return res.status(400).json({ error: "Semua field harus diisi" });
        }
        await user.create(req.body);
        res.status(201).json({ msg: "User created" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Gagal menambahkan user" });
    }
};

// Update user
export const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, judul, catatan } = req.body;
        if (!nama || !judul || !catatan) {
            return res.status(400).json({ error: "Semua field harus diisi" });
        }
        const result = await user.update(req.body, { where: { id } });
        if (result[0] === 0) return res.status(404).json({ error: "User tidak ditemukan" });
        res.status(200).json({ message: "Data berhasil diubah" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Gagal memperbarui data" });
    }
};

// Delete user
export const deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await user.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: "User tidak ditemukan" });
        res.status(200).json({ message: "Data berhasil dihapus" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Gagal menghapus data" });
    }
};
