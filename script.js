// Data awal
let data = {
    barang: JSON.parse(localStorage.getItem('barang')) || [],
    pembeli: JSON.parse(localStorage.getItem('pembeli')) || [],
    invoice: JSON.parse(localStorage.getItem('invoice')) || []
};

// Data warna dan ukuran untuk setiap kategori
const dataKategori = {
    'kaos-polos': {
        nama: 'Kaos Polos',
        warna: [
            { nama: "BLACK", kode: "#000000" },
            { nama: "WHITE", kode: "#FFFFFF" },
            { nama: "SOFT PINK", kode: "#FFB6C1" },
            { nama: "NEON PINK", kode: "#FF1493" },
            { nama: "RED", kode: "#FF0000" },
            { nama: "MAROON", kode: "#800000" },
            { nama: "LILAC", kode: "#C8A2C8" },
            { nama: "SKY BLUE", kode: "#87CEEB" },
            { nama: "ROYAL BLUE", kode: "#4169E1" },
            { nama: "NAVY BLUE", kode: "#000080" },
            { nama: "NEON YELLOW", kode: "#FFFF00" },
            { nama: "TOSCA", kode: "#40E0D0" },
            { nama: "GREEN", kode: "#008000" },
            { nama: "FOREST GREEN", kode: "#228B22" },
            { nama: "YELLOW", kode: "#FFFF00" },
            { nama: "ORANGE", kode: "#FFA500" },
            { nama: "MUSTARD", kode: "#FFDB58" }
        ],
        ukuran: [
            "Dewasa XS", "Dewasa S", "Dewasa M", "Dewasa L", "Dewasa XL", "Dewasa 2XL", "Dewasa 3XL",
            "Anak-anak XS", "Anak-anak S", "Anak-anak M", "Anak-anak L", "Anak-anak XL"
        ]
    },
    'kaos-lengan-panjang': {
        nama: 'Kaos Lengan Panjang',
        warna: [
            { nama: "BLACK", kode: "#000000" },
            { nama: "WHITE", kode: "#FFFFFF" },
            { nama: "SOFT PINK", kode: "#FFB6C1" },
            { nama: "RED", kode: "#FF0000" },
            { nama: "MAROON", kode: "#800000" },
            { nama: "SKY BLUE", kode: "#87CEEB" },
            { nama: "ROYAL BLUE", kode: "#4169E1" },
            { nama: "NAVY BLUE", kode: "#000080" },
            { nama: "NEON YELLOW", kode: "#FFFF00" },
            { nama: "TOSCA", kode: "#40E0D0" },
            { nama: "GREEN", kode: "#008000" },
            { nama: "FOREST GREEN", kode: "#228B22" },
            { nama: "YELLOW", kode: "#FFFF00" },
            { nama: "MUSTARD", kode: "#FFDB58" }
        ],
        ukuran: [
            "Dewasa XS", "Dewasa S", "Dewasa M", "Dewasa L", "Dewasa XL", "Dewasa 2XL", "Dewasa 3XL",
            "Anak-anak XS", "Anak-anak S", "Anak-anak M", "Anak-anak L", "Anak-anak XL"
        ]
    },
    'dress': {
        nama: 'Dress',
        warna: [
            { nama: "BLACK", kode: "#000000" },
            { nama: "WHITE", kode: "#FFFFFF" },
            { nama: "RED", kode: "#FF0000" },
            { nama: "YELLOW", kode: "#FFFF00" }
        ],
        ukuran: [
            "Dewasa S", "Dewasa M", "Dewasa L", "Dewasa XL",
            "Anak S", "Anak M", "Anak L"
        ]
    },
    'lainnya': {
        nama: 'Lainnya',
        warna: [],
        ukuran: []
    }
};

// Fungsi untuk menyimpan data ke localStorage
function simpanData() {
    localStorage.setItem('barang', JSON.stringify(data.barang));
    localStorage.setItem('pembeli', JSON.stringify(data.pembeli));
    localStorage.setItem('invoice', JSON.stringify(data.invoice));
    updateDashboard();
}

// Fungsi untuk menghasilkan ID unik
function generateId() {
    return Date.now().toString();
}

// Fungsi untuk mengubah form berdasarkan kategori yang dipilih
function ubahFormBerdasarkanKategori() {
    const kategori = document.getElementById('kategori-barang').value;
    
    // Sembunyikan semua form kategori
    document.querySelectorAll('.kategori-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Tampilkan form yang sesuai
    if (kategori === 'kaos-polos' || kategori === 'kaos-lengan-panjang') {
        document.getElementById('form-kaos').style.display = 'block';
        isiWarnaDanUkuran(kategori);
    } else if (kategori === 'dress') {
        document.getElementById('form-dress').style.display = 'block';
        isiWarnaDanUkuran(kategori);
    } else if (kategori === 'lainnya') {
        document.getElementById('form-lainnya').style.display = 'block';
    }
}

// Fungsi untuk mengisi opsi warna dan ukuran berdasarkan kategori
function isiWarnaDanUkuran(kategori) {
    const data = dataKategori[kategori];
    
    // Isi warna untuk kaos
    if (kategori === 'kaos-polos' || kategori === 'kaos-lengan-panjang') {
        const selectWarna = document.getElementById('warna-kaos');
        selectWarna.innerHTML = '<option value="">Pilih Warna</option>';
        data.warna.forEach(warna => {
            const option = document.createElement('option');
            option.value = warna.nama;
            option.textContent = warna.nama;
            option.dataset.kode = warna.kode;
            selectWarna.appendChild(option);
        });
        
        // Isi ukuran untuk kaos
        const selectUkuran = document.getElementById('ukuran-kaos');
        selectUkuran.innerHTML = '<option value="">Pilih Ukuran</option>';
        data.ukuran.forEach(ukuran => {
            const option = document.createElement('option');
            option.value = ukuran;
            option.textContent = ukuran;
            selectUkuran.appendChild(option);
        });
    }
    
    // Isi warna untuk dress
    if (kategori === 'dress') {
        const selectWarna = document.getElementById('warna-dress');
        selectWarna.innerHTML = '<option value="">Pilih Warna</option>';
        data.warna.forEach(warna => {
            const option = document.createElement('option');
            option.value = warna.nama;
            option.textContent = warna.nama;
            option.dataset.kode = warna.kode;
            selectWarna.appendChild(option);
        });
        
        // Isi ukuran untuk dress
        const selectUkuran = document.getElementById('ukuran-dress');
        selectUkuran.innerHTML = '<option value="">Pilih Ukuran</option>';
        data.ukuran.forEach(ukuran => {
            const option = document.createElement('option');
            option.value = ukuran;
            option.textContent = ukuran;
            selectUkuran.appendChild(option);
        });
    }
}

// Navigasi antar section
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        // Sembunyikan semua section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Tampilkan section target
        document.getElementById(targetId).classList.add('active');
        
        // Update navigasi aktif
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // Jika pindah ke invoice, isi dropdown pembeli dan barang
        if (targetId === 'invoice') {
            isiDropdownPembeli();
            isiDropdownBarang();
        }
    });
});

// ========== MANAJEMEN BARANG ==========

// Form barang
const formBarang = document.getElementById('form-barang');
const resetBarangBtn = document.getElementById('reset-barang');
const filterKategori = document.getElementById('filter-kategori');

formBarang.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('barang-id').value || generateId();
    const kategori = document.getElementById('kategori-barang').value;
    const harga = parseInt(document.getElementById('harga-barang').value);
    const stok = parseInt(document.getElementById('stok-barang').value);
    const deskripsi = document.getElementById('deskripsi-barang').value;
    
    let nama, warna, ukuran;
    
    // Ambil data berdasarkan kategori
    if (kategori === 'kaos-polos' || kategori === 'kaos-lengan-panjang') {
        warna = document.getElementById('warna-kaos').value;
        ukuran = document.getElementById('ukuran-kaos').value;
        nama = `${dataKategori[kategori].nama} ${warna} ${ukuran}`;
    } else if (kategori === 'dress') {
        warna = document.getElementById('warna-dress').value;
        ukuran = document.getElementById('ukuran-dress').value;
        nama = `${dataKategori[kategori].nama} ${warna} ${ukuran}`;
    } else if (kategori === 'lainnya') {
        nama = document.getElementById('nama-barang').value;
        warna = '';
        ukuran = '';
    }
    
    // Validasi
    if (!nama || !harga || !stok) {
        alert('Harap isi semua field yang diperlukan');
        return;
    }
    
    // Cek apakah edit atau tambah baru
    const index = data.barang.findIndex(item => item.id === id);
    
    if (index !== -1) {
        // Edit barang
        data.barang[index] = { id, kategori, nama, warna, ukuran, harga, stok, deskripsi };
    } else {
        // Tambah barang baru
        data.barang.push({ id, kategori, nama, warna, ukuran, harga, stok, deskripsi });
    }
    
    simpanData();
    renderTabelBarang();
    formBarang.reset();
    document.getElementById('barang-id').value = '';
    
    // Reset tampilan form
    document.querySelectorAll('.kategori-form').forEach(form => {
        form.style.display = 'none';
    });
});

resetBarangBtn.addEventListener('click', function() {
    formBarang.reset();
    document.getElementById('barang-id').value = '';
    document.querySelectorAll('.kategori-form').forEach(form => {
        form.style.display = 'none';
    });
});

// Filter kategori
filterKategori.addEventListener('change', function() {
    renderTabelBarang();
});

// Render tabel barang
function renderTabelBarang() {
    const tbody = document.getElementById('body-tabel-barang');
    tbody.innerHTML = '';
    
    const filter = document.getElementById('filter-kategori').value;
    let barangTampil = data.barang;
    
    if (filter !== 'semua') {
        barangTampil = data.barang.filter(barang => barang.kategori === filter);
    }
    
    barangTampil.forEach((barang, index) => {
        const tr = document.createElement('tr');
        
        // Tentukan kode warna untuk ditampilkan
        let kodeWarna = '';
        if (barang.warna) {
            const dataWarna = dataKategori[barang.kategori]?.warna.find(w => w.nama === barang.warna);
            kodeWarna = dataWarna ? dataWarna.kode : '';
        }
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${dataKategori[barang.kategori]?.nama || 'Lainnya'}</td>
            <td>
                <strong>${barang.nama}</strong>
                ${barang.deskripsi ? `<br><small>${barang.deskripsi}</small>` : ''}
            </td>
            <td>
                ${barang.warna ? `
                    <div class="warna-option">
                        <span class="warna-sample" style="background-color: ${kodeWarna}"></span>
                        ${barang.warna}
                    </div>
                ` : '-'}
            </td>
            <td>${barang.ukuran || '-'}</td>
            <td>Rp ${barang.harga.toLocaleString('id-ID')}</td>
            <td>${barang.stok}</td>
            <td>
                <button class="btn-edit" onclick="editBarang('${barang.id}')">Edit</button>
                <button class="btn-hapus" onclick="hapusBarang('${barang.id}')">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Edit barang
function editBarang(id) {
    const barang = data.barang.find(item => item.id === id);
    if (barang) {
        document.getElementById('barang-id').value = barang.id;
        document.getElementById('kategori-barang').value = barang.kategori;
        ubahFormBerdasarkanKategori();
        
        // Tunggu sebentar agar form sudah berubah
        setTimeout(() => {
            if (barang.kategori === 'kaos-polos' || barang.kategori === 'kaos-lengan-panjang') {
                document.getElementById('warna-kaos').value = barang.warna;
                document.getElementById('ukuran-kaos').value = barang.ukuran;
            } else if (barang.kategori === 'dress') {
                document.getElementById('warna-dress').value = barang.warna;
                document.getElementById('ukuran-dress').value = barang.ukuran;
            } else if (barang.kategori === 'lainnya') {
                document.getElementById('nama-barang').value = barang.nama;
            }
            
            document.getElementById('harga-barang').value = barang.harga;
            document.getElementById('stok-barang').value = barang.stok;
            document.getElementById('deskripsi-barang').value = barang.deskripsi || '';
        }, 100);
        
        // Scroll ke form
        document.getElementById('stok').scrollIntoView({ behavior: 'smooth' });
    }
}

// Hapus barang
function hapusBarang(id) {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        data.barang = data.barang.filter(item => item.id !== id);
        simpanData();
        renderTabelBarang();
    }
}

// ========== MANAJEMEN PEMBELI ==========

// Form pembeli
const formPembeli = document.getElementById('form-pembeli');
const resetPembeliBtn = document.getElementById('reset-pembeli');

formPembeli.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('pembeli-id').value || generateId();
    const nama = document.getElementById('nama-pembeli').value;
    const telepon = document.getElementById('telepon-pembeli').value;
    const email = document.getElementById('email-pembeli').value;
    const alamat = document.getElementById('alamat-pembeli').value;
    
    // Cek apakah edit atau tambah baru
    const index = data.pembeli.findIndex(item => item.id === id);
    
    if (index !== -1) {
        // Edit pembeli
        data.pembeli[index] = { id, nama, telepon, email, alamat };
    } else {
        // Tambah pembeli baru
        data.pembeli.push({ id, nama, telepon, email, alamat });
    }
    
    simpanData();
    renderTabelPembeli();
    formPembeli.reset();
    document.getElementById('pembeli-id').value = '';
});

resetPembeliBtn.addEventListener('click', function() {
    formPembeli.reset();
    document.getElementById('pembeli-id').value = '';
});

// Render tabel pembeli
function renderTabelPembeli() {
    const tbody = document.getElementById('body-tabel-pembeli');
    tbody.innerHTML = '';
    
    data.pembeli.forEach((pembeli, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${pembeli.nama}</td>
            <td>${pembeli.telepon}</td>
            <td>${pembeli.email || '-'}</td>
            <td>${pembeli.alamat}</td>
            <td>
                <button class="btn-edit" onclick="editPembeli('${pembeli.id}')">Edit</button>
                <button class="btn-hapus" onclick="hapusPembeli('${pembeli.id}')">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Edit pembeli
function editPembeli(id) {
    const pembeli = data.pembeli.find(item => item.id === id);
    if (pembeli) {
        document.getElementById('pembeli-id').value = pembeli.id;
        document.getElementById('nama-pembeli').value = pembeli.nama;
        document.getElementById('telepon-pembeli').value = pembeli.telepon;
        document.getElementById('email-pembeli').value = pembeli.email || '';
        document.getElementById('alamat-pembeli').value = pembeli.alamat;
        
        // Scroll ke form
        document.getElementById('pembeli').scrollIntoView({ behavior: 'smooth' });
    }
}

// Hapus pembeli
function hapusPembeli(id) {
    if (confirm('Apakah Anda yakin ingin menghapus pembeli ini?')) {
        data.pembeli = data.pembeli.filter(item => item.id !== id);
        simpanData();
        renderTabelPembeli();
    }
}

// ========== MANAJEMEN INVOICE ==========

// Data sementara untuk barang di invoice
let barangInvoice = [];

// Form invoice
const formInvoice = document.getElementById('form-invoice');
const resetInvoiceBtn = document.getElementById('reset-invoice');
const tambahBarangInvoiceBtn = document.getElementById('tambah-barang-invoice');

formInvoice.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (barangInvoice.length === 0) {
        alert('Invoice harus memiliki minimal satu barang');
        return;
    }
    
    const id = document.getElementById('invoice-id').value || generateId();
    const nomor = document.getElementById('nomor-invoice').value;
    const tanggal = document.getElementById('tanggal-invoice').value;
    const idPembeli = document.getElementById('pembeli-invoice').value;
    
    // Hitung total
    const total = barangInvoice.reduce((sum, item) => sum + item.subtotal, 0);
    
    // Cari nama pembeli
    const pembeli = data.pembeli.find(p => p.id === idPembeli);
    const namaPembeli = pembeli ? pembeli.nama : 'Unknown';
    
    // Cek apakah edit atau tambah baru
    const index = data.invoice.findIndex(item => item.id === id);
    
    // Validasi stok sebelum menyimpan invoice
    if (!validasiStokSebelumSimpan()) {
        alert('Tidak dapat menyimpan invoice karena stok tidak mencukupi untuk beberapa barang');
        return;
    }
    
    if (index !== -1) {
        // Edit invoice - kembalikan stok dari invoice lama terlebih dahulu
        const invoiceLama = data.invoice[index];
        kembalikanStokDariInvoice(invoiceLama);
        
        // Edit invoice
        data.invoice[index] = { 
            id, 
            nomor, 
            tanggal, 
            idPembeli, 
            namaPembeli,
            barang: [...barangInvoice], 
            total 
        };
        
        // Kurangi stok untuk invoice yang baru
        kurangiStokUntukInvoice(barangInvoice);
    } else {
        // Tambah invoice baru
        data.invoice.push({ 
            id, 
            nomor, 
            tanggal, 
            idPembeli, 
            namaPembeli,
            barang: [...barangInvoice], 
            total 
        });
        
        // Kurangi stok untuk invoice baru
        kurangiStokUntukInvoice(barangInvoice);
    }
    
    simpanData();
    renderTabelInvoice();
    renderTabelBarang(); // Refresh tabel barang untuk menampilkan stok terbaru
    resetFormInvoice();
    
    alert('Invoice berhasil disimpan dan stok telah diperbarui');
});

resetInvoiceBtn.addEventListener('click', function() {
    resetFormInvoice();
});

tambahBarangInvoiceBtn.addEventListener('click', function() {
    const idBarang = document.getElementById('barang-invoice').value;
    if (!idBarang) {
        alert('Pilih barang terlebih dahulu');
        return;
    }
    
    const barang = data.barang.find(b => b.id === idBarang);
    if (!barang) return;
    
    // Cek stok
    if (barang.stok <= 0) {
        alert('Stok barang habis');
        return;
    }
    
    // Cek apakah barang sudah ada di invoice
    const existingItem = barangInvoice.find(item => item.id === idBarang);
    
    if (existingItem) {
        // Update jumlah
        if (existingItem.jumlah >= barang.stok) {
            alert('Stok tidak mencukupi');
            return;
        }
        existingItem.jumlah += 1;
        existingItem.subtotal = existingItem.jumlah * existingItem.harga;
    } else {
        // Tambah barang baru
        barangInvoice.push({
            id: barang.id,
            nama: barang.nama,
            harga: barang.harga,
            jumlah: 1,
            subtotal: barang.harga
        });
    }
    
    renderTabelBarangInvoice();
    updateTotalInvoice();
});

// Fungsi untuk memvalidasi stok sebelum menyimpan invoice
function validasiStokSebelumSimpan() {
    for (const item of barangInvoice) {
        const barang = data.barang.find(b => b.id === item.id);
        if (!barang) {
            alert(`Barang ${item.nama} tidak ditemukan`);
            return false;
        }
        
        // Untuk edit invoice, kita perlu mempertimbangkan stok yang sudah ada di invoice lama
        const invoiceId = document.getElementById('invoice-id').value;
        if (invoiceId) {
            // Jika sedang edit invoice, cari invoice lama
            const invoiceLama = data.invoice.find(inv => inv.id === invoiceId);
            if (invoiceLama) {
                // Cari item yang sama di invoice lama
                const itemLama = invoiceLama.barang.find(b => b.id === item.id);
                if (itemLama) {
                    // Hitung perubahan stok
                    const perubahanJumlah = item.jumlah - itemLama.jumlah;
                    if (barang.stok < perubahanJumlah) {
                        alert(`Stok ${barang.nama} tidak mencukupi. Stok tersedia: ${barang.stok}, diperlukan: ${perubahanJumlah}`);
                        return false;
                    }
                } else {
                    // Item baru di invoice
                    if (barang.stok < item.jumlah) {
                        alert(`Stok ${barang.nama} tidak mencukupi. Stok tersedia: ${barang.stok}, diperlukan: ${item.jumlah}`);
                        return false;
                    }
                }
            }
        } else {
            // Untuk invoice baru
            if (barang.stok < item.jumlah) {
                alert(`Stok ${barang.nama} tidak mencukupi. Stok tersedia: ${barang.stok}, diperlukan: ${item.jumlah}`);
                return false;
            }
        }
    }
    return true;
}

// Fungsi untuk mengurangi stok berdasarkan invoice
function kurangiStokUntukInvoice(barangInvoice) {
    barangInvoice.forEach(item => {
        const barang = data.barang.find(b => b.id === item.id);
        if (barang) {
            barang.stok -= item.jumlah;
            if (barang.stok < 0) barang.stok = 0; // Pastikan stok tidak negatif
        }
    });
}

// Fungsi untuk mengembalikan stok dari invoice (saat edit atau hapus)
function kembalikanStokDariInvoice(invoice) {
    invoice.barang.forEach(item => {
        const barang = data.barang.find(b => b.id === item.id);
        if (barang) {
            barang.stok += item.jumlah;
        }
    });
}

// Isi dropdown pembeli
function isiDropdownPembeli() {
    const select = document.getElementById('pembeli-invoice');
    select.innerHTML = '<option value="">Pilih Pembeli</option>';
    
    data.pembeli.forEach(pembeli => {
        const option = document.createElement('option');
        option.value = pembeli.id;
        option.textContent = pembeli.nama;
        select.appendChild(option);
    });
}

// Isi dropdown barang
function isiDropdownBarang() {
    const select = document.getElementById('barang-invoice');
    select.innerHTML = '<option value="">Pilih Barang</option>';
    
    data.barang.forEach(barang => {
        if (barang.stok > 0) {
            const option = document.createElement('option');
            option.value = barang.id;
            option.textContent = `${barang.nama} - Rp ${barang.harga.toLocaleString('id-ID')} (Stok: ${barang.stok})`;
            select.appendChild(option);
        }
    });
}

// Render tabel barang di invoice
function renderTabelBarangInvoice() {
    const tbody = document.getElementById('body-tabel-barang-invoice');
    tbody.innerHTML = '';
    
    barangInvoice.forEach((barang, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${barang.nama}</td>
            <td>Rp ${barang.harga.toLocaleString('id-ID')}</td>
            <td>
                <input type="number" value="${barang.jumlah}" min="1" 
                       onchange="updateJumlahBarangInvoice(${index}, this.value)">
            </td>
            <td>Rp ${barang.subtotal.toLocaleString('id-ID')}</td>
            <td>
                <button class="btn-hapus" onclick="hapusBarangInvoice(${index})">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Update jumlah barang di invoice
function updateJumlahBarangInvoice(index, jumlah) {
    if (jumlah < 1) {
        alert('Jumlah tidak boleh kurang dari 1');
        document.querySelectorAll('#body-tabel-barang-invoice input')[index].value = barangInvoice[index].jumlah;
        return;
    }
    
    // Cek stok
    const barang = data.barang.find(b => b.id === barangInvoice[index].id);
    if (parseInt(jumlah) > barang.stok) {
        alert('Stok tidak mencukupi');
        document.querySelectorAll('#body-tabel-barang-invoice input')[index].value = barangInvoice[index].jumlah;
        return;
    }
    
    barangInvoice[index].jumlah = parseInt(jumlah);
    barangInvoice[index].subtotal = barangInvoice[index].harga * parseInt(jumlah);
    
    renderTabelBarangInvoice();
    updateTotalInvoice();
}

// Hapus barang dari invoice
function hapusBarangInvoice(index) {
    barangInvoice.splice(index, 1);
    renderTabelBarangInvoice();
    updateTotalInvoice();
}

// Update total invoice
function updateTotalInvoice() {
    const total = barangInvoice.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById('total-invoice-amount').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Reset form invoice
function resetFormInvoice() {
    formInvoice.reset();
    document.getElementById('invoice-id').value = '';
    barangInvoice = [];
    renderTabelBarangInvoice();
    updateTotalInvoice();
    
    // Set tanggal hari ini
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggal-invoice').value = today;
}

// Render tabel invoice
function renderTabelInvoice() {
    const tbody = document.getElementById('body-tabel-invoice');
    tbody.innerHTML = '';
    
    data.invoice.forEach((invoice, index) => {
        // Hitung total jumlah barang
        const totalJumlahBarang = invoice.barang.reduce((total, item) => total + item.jumlah, 0);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${invoice.nomor}</td>
            <td>${new Date(invoice.tanggal).toLocaleDateString('id-ID')}</td>
            <td>${invoice.namaPembeli}</td>
            <td>${totalJumlahBarang} pcs</td>
            <td>Rp ${invoice.total.toLocaleString('id-ID')}</td>
            <td>
                <button class="btn-lihat" onclick="lihatInvoice('${invoice.id}')">Lihat</button>
                <button class="btn-edit" onclick="editInvoice('${invoice.id}')">Edit</button>
                <button class="btn-hapus" onclick="hapusInvoice('${invoice.id}')">Hapus</button>
                <button class="btn-cetak" onclick="cetakInvoice('${invoice.id}')">Cetak</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Edit invoice
function editInvoice(id) {
    const invoice = data.invoice.find(item => item.id === id);
    if (invoice) {
        document.getElementById('invoice-id').value = invoice.id;
        document.getElementById('nomor-invoice').value = invoice.nomor;
        document.getElementById('tanggal-invoice').value = invoice.tanggal;
        document.getElementById('pembeli-invoice').value = invoice.idPembeli;
        
        // Set barang invoice
        barangInvoice = [...invoice.barang];
        renderTabelBarangInvoice();
        updateTotalInvoice();
        
        // Scroll ke form
        document.getElementById('invoice').scrollIntoView({ behavior: 'smooth' });
    }
}

// Hapus invoice
function hapusInvoice(id) {
    if (confirm('Apakah Anda yakin ingin menghapus invoice ini? Stok barang akan dikembalikan.')) {
        const invoice = data.invoice.find(item => item.id === id);
        if (invoice) {
            // Kembalikan stok barang
            kembalikanStokDariInvoice(invoice);
            
            // Hapus invoice
            data.invoice = data.invoice.filter(item => item.id !== id);
            simpanData();
            renderTabelInvoice();
            renderTabelBarang(); // Refresh tabel barang untuk menampilkan stok terbaru
            
            alert('Invoice berhasil dihapus dan stok telah dikembalikan');
        }
    }
}

// ========== FUNGSI LIHAT INVOICE ==========

// Fungsi untuk menampilkan modal lihat invoice
function lihatInvoice(id) {
    const invoice = data.invoice.find(item => item.id === id);
    if (!invoice) return;
    
    const pembeli = data.pembeli.find(p => p.id === invoice.idPembeli);
    
    // Hitung total jumlah barang
    const totalJumlahBarang = invoice.barang.reduce((total, item) => total + item.jumlah, 0);
    
    // Buat konten untuk modal
    const modalContent = `
        <div class="modal-content">
            <span class="close-modal" onclick="tutupModal()">&times;</span>
            <div class="modal-header">
                <h2>Detail Invoice</h2>
            </div>
            <div class="invoice-container">
                <div class="invoice-header">
                    <h1>INVOICE</h1>
                    <h2>${invoice.nomor}</h2>
                </div>
                
                <div class="invoice-info">
                    <div class="invoice-date">
                        <p><strong>Tanggal:</strong> ${new Date(invoice.tanggal).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div class="invoice-customer">
                        <p><strong>Kepada:</strong></p>
                        <p>${pembeli.nama}</p>
                        <p>${pembeli.alamat}</p>
                        <p>${pembeli.telepon}</p>
                        ${pembeli.email ? `<p>${pembeli.email}</p>` : ''}
                    </div>
                </div>
                
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Harga Satuan</th>
                            <th>Jumlah</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.barang.map(item => `
                            <tr>
                                <td>${item.nama}</td>
                                <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
                                <td>${item.jumlah}</td>
                                <td>Rp ${item.subtotal.toLocaleString('id-ID')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="invoice-total">
                    <p><strong>Total Barang: ${totalJumlahBarang} pcs</strong></p>
                    <h3>Total: Rp ${invoice.total.toLocaleString('id-ID')}</h3>
                </div>
                
                <div class="invoice-footer">
                    <p>Terima kasih atas pembelian Anda!</p>
                </div>
            </div>
            <div class="modal-actions no-print">
                <button onclick="cetakInvoice('${invoice.id}')" class="btn-cetak">Cetak Invoice</button>
                <button onclick="tutupModal()" class="btn-hapus">Tutup</button>
            </div>
        </div>
    `;
    
    // Tampilkan modal
    document.getElementById('modal-invoice').innerHTML = modalContent;
    document.getElementById('modal-invoice').style.display = 'block';
}

// Fungsi untuk menutup modal
function tutupModal() {
    document.getElementById('modal-invoice').style.display = 'none';
}

// Cetak invoice
function cetakInvoice(id) {
    const invoice = data.invoice.find(item => item.id === id);
    if (!invoice) return;
    
    const pembeli = data.pembeli.find(p => p.id === invoice.idPembeli);
    
    // Hitung total jumlah barang
    const totalJumlahBarang = invoice.barang.reduce((total, item) => total + item.jumlah, 0);
    
    // Buat konten untuk cetak
    const printContent = `
        <html>
        <head>
            <title>Invoice ${invoice.nomor}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .total { text-align: right; font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>INVOICE</h1>
                <h2>${invoice.nomor}</h2>
            </div>
            
            <div class="info">
                <p><strong>Tanggal:</strong> ${new Date(invoice.tanggal).toLocaleDateString('id-ID')}</p>
                <p><strong>Kepada:</strong></p>
                <p>${pembeli.nama}</p>
                <p>${pembeli.alamat}</p>
                <p>${pembeli.telepon}</p>
                ${pembeli.email ? `<p>${pembeli.email}</p>` : ''}
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Nama Barang</th>
                        <th>Harga Satuan</th>
                        <th>Jumlah</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.barang.map(item => `
                        <tr>
                            <td>${item.nama}</td>
                            <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
                            <td>${item.jumlah}</td>
                            <td>Rp ${item.subtotal.toLocaleString('id-ID')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="total">
                <p>Total Barang: ${totalJumlahBarang} pcs</p>
                <p>Total: Rp ${invoice.total.toLocaleString('id-ID')}</p>
            </div>
            
            <div style="margin-top: 50px; text-align: center;">
                <p>Terima kasih atas pembelian Anda!</p>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

// ========== DASHBOARD ==========

// Update dashboard
function updateDashboard() {
    document.getElementById('total-produk').textContent = data.barang.length;
    document.getElementById('total-pembeli').textContent = data.pembeli.length;
    
    // Hitung invoice bulan ini
    const now = new Date();
    const bulanIni = now.getMonth();
    const tahunIni = now.getFullYear();
    
    const invoiceBulanIni = data.invoice.filter(invoice => {
        const tanggalInvoice = new Date(invoice.tanggal);
        return tanggalInvoice.getMonth() === bulanIni && 
               tanggalInvoice.getFullYear() === tahunIni;
    });
    
    document.getElementById('total-invoice').textContent = invoiceBulanIni.length;
}

// ========== INISIALISASI ==========

// Inisialisasi aplikasi
function init() {
    // Set tanggal hari ini sebagai default untuk form invoice
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggal-invoice').value = today;
    
    // Render data awal
    renderTabelBarang();
    renderTabelPembeli();
    renderTabelInvoice();
    updateDashboard();
    
    // Isi dropdown untuk invoice
    isiDropdownPembeli();
    isiDropdownBarang();
    
    // Tutup modal ketika klik di luar konten modal
    window.onclick = function(event) {
        const modal = document.getElementById('modal-invoice');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Jalankan inisialisasi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', init);
