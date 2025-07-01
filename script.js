// Daftar Harga
    const hargaPerPcs = [
      { min: 72, harga: 88000 },
      { min: 36, harga: 94000 },
      { min: 12, harga: 99000 },
      { min: 3, harga: 104000 },
      { min: 2, harga: 110000 },
      { min: 1, harga: 138000 }
    ];

    // Tambahan harga ukuran besar
    const tambahanUkuran = {
      "2XL": 8000,
      "3XL": 13000
    };

    // Daftar Warna Tersedia
    let warnaIndex = 0;

    const fileListMap = {};

    const warnaList = [
      "BLACK", "WHITE", "SOFT PINK", "NEON PINK", "RED", "MAROON", "LILAC", 
      "SKY BLUE", "ROYAL BLUE", "NAVY BLUE", "NEON YELLOW", "TOSCA", 
      "GREEN", "FOREST GREEN", "YELLOW", "ORANGE", "MUSTARD"
    ];

    // Format Rupiah
    function formatRupiah(angka) {
      return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(angka);
    }

    // Hitung Total Harga
    function hitungHargaTotal() {
  const sections = document.querySelectorAll('.warna-section');
  const hargaDiv = document.getElementById('rincianHarga');
  let grandTotal = 0;
  let totalQtyKeseluruhan = 0;
  let semuaDewasa = [];
  let semuaAnak = [];
  let tambahanDetail = {
    "2XL": 0,
    "3XL": 0
  };
  let output = '';

  sections.forEach((section, index) => {
    const warna = section.querySelector('select').value;
    const dewasaInputs = section.querySelectorAll('input[name^="dewasa_"]');
    const anakInputs = section.querySelectorAll('input[name^="anak_"]');

    let dewasaDetail = [];
    let anakDetail = [];

    dewasaInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        dewasaDetail.push(`${size} (${qty})`);
        totalQtyKeseluruhan += qty;
        if (tambahanUkuran[size]) {
          tambahanDetail[size] += qty;
        }
      }
    });

    anakInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        anakDetail.push(`${size} (${qty})`);
        totalQtyKeseluruhan += qty;
      }
    });

    if (warna && (dewasaDetail.length > 0 || anakDetail.length > 0)) {
      output += `<div style="margin-bottom: 1em"><strong>${warna}</strong><br>`;
      if (dewasaDetail.length > 0) output += `Dewasa: ${dewasaDetail.join(', ')}<br>`;
      if (anakDetail.length > 0) output += `Anak-anak: ${anakDetail.join(', ')}<br>`;
      output += `</div>`;
    }
  });

  // Harga dasar per pcs berdasarkan total qty
  const harga = hargaPerPcs.find(h => totalQtyKeseluruhan >= h.min)?.harga || 0;
  const subTotal = harga * totalQtyKeseluruhan;

  // Hitung tambahan
  let tambahanRincian = '';
  let totalTambahan = 0;
  for (let [ukuran, qty] of Object.entries(tambahanDetail)) {
    if (qty > 0) {
      const biaya = tambahanUkuran[ukuran] * qty;
      totalTambahan += biaya;
      tambahanRincian += `Tambahan ${ukuran}: ${formatRupiah(tambahanUkuran[ukuran])} × ${qty} = ${formatRupiah(biaya)}<br>`;
    }
  }

  let totalSemua = subTotal + totalTambahan;

  // Hasil akhir output
  output += `<div style="margin-top: 1em; font-weight:bold">
    Total Harga: ${formatRupiah(harga)} × ${totalQtyKeseluruhan} = ${formatRupiah(subTotal)}<br>
    ${tambahanRincian}
    <div style="margin-top: 10px; font-size: 18px">TOTAL SEMUA: ${formatRupiah(totalSemua)}</div>
  </div>`;

  hargaDiv.innerHTML = output;
}

    // Tambah Form Warna Baru
    function tambahWarna() {
  warnaIndex++;
  const container = document.getElementById('warnaContainer');
  const section = document.createElement('div');
  section.className = 'warna-section';
  section.id = `warna-${warnaIndex}`;

  section.innerHTML = `
    <div class="header-warna">
      <label>Warna Kaos #${warnaIndex}</label>
      <button type="button" class="delete-btn" onclick="hapusWarna('warna-${warnaIndex}')">
        ✕ Hapus Warna
      </button>
    </div>

    <select name="warna${warnaIndex}" onchange="updateTotal()" required>
      <option value="">-- Pilih Warna --</option>
      ${warnaList.map(warna => `<option value="${warna}">${warna}</option>`).join('')}
    </select>

    <div class="table-container">
      <h4>Ukuran Dewasa</h4>
      <table>
        <tr>
          <th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th>
        </tr>
        <tr>
          ${['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(ukuran => `
            <td><input type="number" name="dewasa_${warnaIndex}_${ukuran}" 
                   min="0" value="0" oninput="updateTotal()"></td>
          `).join('')}
        </tr>
      </table>
    </div>

    <div class="table-container">
      <h4>Ukuran Anak</h4>
      <table>
        <tr>
          <th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th>
        </tr>
        <tr>
          ${['XS', 'S', 'M', 'L', 'XL'].map(ukuran => `
            <td><input type="number" name="anak_${warnaIndex}_${ukuran}" 
                   min="0" value="0" oninput="updateTotal()"></td>
          `).join('')}
        </tr>
      </table>
    </div>

    <div class="desain-section">
      <h4>🎨 Perincian Desain</h4>
  
      <label>Desain Depan</label>
      <textarea name="desain_depan_${warnaIndex}" placeholder="Contoh: Logo depan ukuran 10x10cm, warna merah"></textarea>
        
      <label>Desain Belakang</label>
      <textarea name="desain_belakang_${warnaIndex}" placeholder="Contoh: Tulisan 'Clovertees' dengan font Arial"></textarea>
        
      <label>Desain Lengan (jika ada)</label>
      <textarea name="desain_lengan_${warnaIndex}" placeholder="Contoh: Strip horizontal 2cm dari ujung lengan"></textarea>
    </div>

    <div class="file-upload-container">
  <label>Upload Desain (warna ini)</label>

  <input 
    type="file" 
    class="fileDesainCloud"
    name="file_warna_${warnaIndex}" 
    id="fileDesain_${warnaIndex}" 
    data-warna-index="${warnaIndex}" 
    multiple 
    accept="image/*,.pdf,.ai,.psd"
    hidden
  >
  <button 
    type="button" 
    class="add-file-btn" 
    onclick="document.getElementById('fileDesain_${warnaIndex}').click()"
  >
  + Tambah File
  </button>

     <div class="file-list" id="fileList_${warnaIndex}"></div>
  <input type="hidden" name="linkDesain_${warnaIndex}" id="linkDesain_${warnaIndex}">
  <small>Format: JPG, PNG, PDF, AI, PSD (max 5MB/file)</small>
  </div>

  `;

  container.appendChild(section);
  updateTotal();
}

  
    // Hapus Warna
    function hapusWarna(id) {
      if (confirm('Yakin ingin menghapus warna ini?')) {
        document.getElementById(id).remove();
        updateTotal();
      }
    }

    // Update Total Pesanan
    function updateTotal() {
    const sections = document.querySelectorAll('.warna-section');
    let totalPcs = 0;
    let detailPesanan = '';

    sections.forEach((section, idx) => {
    const warna = section.querySelector('select').value;
    const dewasaInputs = section.querySelectorAll('input[name^="dewasa_"]');
    const anakInputs = section.querySelectorAll('input[name^="anak_"]');
    
    let totalWarna = 0;
    let detailDewasa = [];
    let detailAnak = [];

    // Hitung item dewasa
    dewasaInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        totalWarna += qty;
        detailDewasa.push(`${size} ${qty}`);
      }
    });

    // Hitung item anak
    anakInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        totalWarna += qty;
        detailAnak.push(`${size} ${qty}`);
      }
    });

    if (warna && totalWarna > 0) {
      totalPcs += totalWarna;
      detailPesanan += `${idx + 1}. ${warna}: ${totalWarna} pcs\n`;
      
      if (detailDewasa.length > 0) {
        detailPesanan += `   Dewasa: ${detailDewasa.join(', ')}\n`;
      }
      
      if (detailAnak.length > 0) {
        detailPesanan += `   Anak-anak: ${detailAnak.join(', ')}\n`;
      }
      
      detailPesanan += '\n'; // Spasi antar warna
    }
  });

  document.getElementById('totalDisplay').innerHTML = `
    <strong>Total Pesanan: ${totalPcs} pcs</strong>
    <pre style="margin-top:10px">${detailPesanan}</pre>
  `;
  hitungHargaTotal();
}

function generateHargaFullFormat() {
  const sections = document.querySelectorAll('.warna-section');
  let grandTotal = 0;
  let totalQtyKeseluruhan = 0;
  let tambahanDetail = { "2XL": 0, "3XL": 0 };
  let output = "";

  sections.forEach((section, idx) => {
    const warna = section.querySelector('select').value;
    const dewasaInputs = section.querySelectorAll('input[name^="dewasa_"]');
    const anakInputs = section.querySelectorAll('input[name^="anak_"]');

    let dewasaDetail = [];
    let anakDetail = [];

    dewasaInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        dewasaDetail.push(`${size} (${qty})`);
        totalQtyKeseluruhan += qty;
        if (tambahanUkuran[size]) tambahanDetail[size] += qty;
      }
    });

    anakInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        anakDetail.push(`${size} (${qty})`);
        totalQtyKeseluruhan += qty;
      }
    });

    if (warna && (dewasaDetail.length || anakDetail.length)) {
      output += `${warna}\n`;
      if (dewasaDetail.length) output += `Dewasa: ${dewasaDetail.join(', ')}\n`;
      if (anakDetail.length) output += `Anak-anak: ${anakDetail.join(', ')}\n`;
      output += `\n`; // Spasi antar warna
    }
  });

  const harga = hargaPerPcs.find(h => totalQtyKeseluruhan >= h.min)?.harga || 138000;
  const subTotal = harga * totalQtyKeseluruhan;

  output += `Total Harga: ${formatRupiah(harga)} × ${totalQtyKeseluruhan} = ${formatRupiah(subTotal)}\n`;

  let totalTambahan = 0;
  for (let [ukuran, qty] of Object.entries(tambahanDetail)) {
    if (qty > 0) {
      const biaya = tambahanUkuran[ukuran] * qty;
      totalTambahan += biaya;
      output += `Tambahan ${ukuran}: ${formatRupiah(tambahanUkuran[ukuran])} × ${qty} = ${formatRupiah(biaya)}\n`;
    }
  }

  output += `\nTOTAL SEMUA: ${formatRupiah(subTotal + totalTambahan)}`;

  return output.trim();
}
    //-biar bisa masuk ke sheet totalannya-//
    function generateHargaFullFormat() {
  const sections = document.querySelectorAll('.warna-section');
  let grandTotal = 0;
  let totalQtyKeseluruhan = 0;
  let tambahanDetail = { "2XL": 0, "3XL": 0 };
  let output = "";

  sections.forEach((section, idx) => {
    const warna = section.querySelector('select').value;
    const dewasaInputs = section.querySelectorAll('input[name^="dewasa_"]');
    const anakInputs = section.querySelectorAll('input[name^="anak_"]');

    let dewasaDetail = [];
    let anakDetail = [];

    dewasaInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        dewasaDetail.push(`${size} (${qty})`);
        totalQtyKeseluruhan += qty;
        if (tambahanUkuran[size]) tambahanDetail[size] += qty;
      }
    });

    anakInputs.forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const size = input.name.split('_')[2];
        anakDetail.push(`${size} (${qty})`);
        totalQtyKeseluruhan += qty;
      }
    });

    if (warna && (dewasaDetail.length || anakDetail.length)) {
      output += `${warna}\n`;
      if (dewasaDetail.length) output += `Dewasa: ${dewasaDetail.join(', ')}\n`;
      if (anakDetail.length) output += `Anak-anak: ${anakDetail.join(', ')}\n`;
      output += `\n`; // Spasi antar warna
    }
  });

  const harga = hargaPerPcs.find(h => totalQtyKeseluruhan >= h.min)?.harga || 138000;
  const subTotal = harga * totalQtyKeseluruhan;

  output += `Total Harga: ${formatRupiah(harga)} × ${totalQtyKeseluruhan} = ${formatRupiah(subTotal)}\n`;

  let totalTambahan = 0;
  for (let [ukuran, qty] of Object.entries(tambahanDetail)) {
    if (qty > 0) {
      const biaya = tambahanUkuran[ukuran] * qty;
      totalTambahan += biaya;
      output += `Tambahan ${ukuran}: ${formatRupiah(tambahanUkuran[ukuran])} × ${qty} = ${formatRupiah(biaya)}\n`;
    }
  }

  output += `\nTOTAL SEMUA: ${formatRupiah(subTotal + totalTambahan)}`;

  return output.trim();
  }

    // ========== PENANGANAN PENGIRIMAN FORM YANG DIPERBAIKI ==========
    document.getElementById('formPemesanan').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validasi nomor WhatsApp
      const waNumber = e.target.telepon.value;
      if (!/^[0-9]{10,13}$/.test(waNumber)) {
        alert('Nomor WhatsApp harus 10-13 digit angka!');
        return;
      }

      // Validasi minimal 1 item dipesan
      const totalPcs = document.getElementById('totalDisplay').textContent.match(/\d+/)[0] || 0;
      if (totalPcs == 0) {
        alert('Anda belum memilih jumlah pesanan!');
        return;
      }

      // Tampilkan status loading
      document.getElementById('loadingMessage').style.display = 'block';
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      // upload ke Cloudinary
      for (let warnaIndex in fileListMap) {
  const files = fileListMap[warnaIndex];
  const urls = [];

  for (let file of files) {
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", uploadPreset);
    formDataCloud.append("folder", "clovertees_uploads");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formDataCloud
      });
      const data = await res.json();
      if (data.secure_url) urls.push(data.secure_url);
    } catch (err) {
      alert("❌ Gagal upload file ke Cloudinary!");
      console.error(err);
      return;
    }
  }

  const inputHidden = document.getElementById(`linkDesain_${warnaIndex}`);
  if (inputHidden) {
    inputHidden.value = urls.join(", ");
  }
}

      try {
        // Siapkan data form
        const formData = new FormData(e.target);
        formData.append('timestamp', new Date().toISOString());
        formData.append('totalQty', totalPcs);
        formData.append('detailPesanan', generateDetailPesanan());
        formData.append('totalHarga', document.getElementById('rincianHarga').textContent.split('TOTAL SEMUA: ')[1]);
        formData.append('hargaFormatted', generateHargaFullFormat()); // ✅ ini tambahan baru

        const fileSections = document.querySelectorAll('.file-upload-container');

        fileSections.forEach((section) => {
          const input = section.querySelector('input[type="file"]');
          if (!input || !input.files) return;

          const files = input.files;
          const nameAttr = input.getAttribute("name");

          for (let j = 0; j < files.length; j++) {
            formData.append(nameAttr, files[j], files[j].name);
          }
        });

        // Ganti dengan URL Google Apps Script Anda yang sebenarnya
        const scriptURL = "https://script.google.com/macros/s/AKfycbwUpOChvW_bEKwqiKjeDCjx-R-Gn9h40BsQwMM7RiUGuLH8msOUCpFtcm8qGRGu1qFG3w/exec"
        
        for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await fetch(scriptURL, {
          method: 'POST',
          body: formData,
          redirect: 'follow'
        });

        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Full response:", result); 
        
        if (result.status === "success") {
          alert(`✅ Nomor Pesanan #${result.nomorPesanan} berhasil! Kami akan menghubungi Anda via WhatsApp.`);
          e.target.reset();
          document.getElementById('warnaContainer').innerHTML = '';
          warnaIndex = 0;
          tambahWarna();
        } else {
          throw new Error(result.message || "Error tidak diketahui dari server");
        }
      } catch (error) {
        console.error('Error pengiriman:', error);
        alert(`❌ Gagal mengirim pesanan: ${error.message}`);
      } finally {
        document.getElementById('loadingMessage').style.display = 'none';
        submitBtn.disabled = false;
      }
    });

    // Generator detail yang diperbaiki
    function generateDetailPesanan() {
      const sections = document.querySelectorAll('.warna-section');
      let output = "";
      
      sections.forEach((section, idx) => {
        const warna = section.querySelector('select').value;
        const inputs = section.querySelectorAll('input[type="number"]');
        
        let dewasa = [], anak = [];
        
        inputs.forEach(input => {
          const qty = parseInt(input.value) || 0;
          if (qty > 0) {
            const size = input.name.split('_')[2];
            if (input.name.includes('dewasa')) {
              dewasa.push(`${size} (${qty})`);
            } else {
              anak.push(`${size} (${qty})`);
            }
          }
        });
        
        if (warna && (dewasa.length > 0 || anak.length > 0)) {
          output += `${idx + 1}. ${warna}:\n`;
          if (dewasa.length) output += `   Dewasa: ${dewasa.join(', ')}\n`;
          if (anak.length) output += `   Anak: ${anak.join(', ')}\n\n`;
        }
      });
      
      return output.trim();
    }

    function setupFileUpload(sectionId) {
  const section = document.getElementById(sectionId);
  const fileInput = section.querySelector('input[type="file"]');
  const fileList = section.querySelector('.file-list');
  const maxFiles = 5; // Batas maksimal file

  fileInput.addEventListener('change', function(e) {
    const files = e.target.files;
    
    // Cek jumlah file
    if (fileList.children.length + files.length > maxFiles) {
      alert(`Maksimal ${maxFiles} file per warna`);
      return;
    }

    // Tambahkan file ke daftar
    Array.from(files).forEach(file => {
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} terlalu besar (max 5MB)`);
        return;
      }

      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.dataset.fileName = file.name;
      fileItem.innerHTML = `
        <span>${file.name} (${(file.size/1024/1024).toFixed(2)}MB)</span>
        <button type="button" class="delete-file-btn">✕</button>
      `;
      fileList.appendChild(fileItem);
    });

    // Reset input untuk mengizinkan upload file yang sama lagi
    fileInput.value = '';
  });

  // Handle klik tombol hapus file
  fileList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-file-btn')) {
      e.target.closest('.file-item').remove();
    }
  });
}

  // Tambah warna pertama saat halaman dimuat
  window.onload = function () {
  tambahWarna(); // untuk warna pertama otomatis
  validasiInputRealtime(); // jika kamu pakai validasi real-time
};

function renderFileList(warnaIndex) {
  const listContainer = document.querySelector(`#warna-${warnaIndex} .file-list`);
  listContainer.innerHTML = "";

  fileListMap[warnaIndex].forEach((file, idx) => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      ${file.name}
      <button type="button" onclick="removeFile(${warnaIndex}, ${idx})" style="margin-left: 10px;">❌</button>
    `;
    listContainer.appendChild(div);
  });
}

function removeFile(warnaIndex, fileIndex) {
  fileListMap[warnaIndex].splice(fileIndex, 1);
  renderFileList(warnaIndex);
}

// ==========================
// Upload Cloudinary per warna (dinamis)
// ==========================
const cloudName = "ddlisdhml"; // GANTI dengan Cloudinary kamu
const uploadPreset = "clovr_unsigned"; // GANTI dengan preset kamu

document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("fileDesainCloud")) return;

  const input = e.target;
  const warnaIndex = input.dataset.warnaIndex;
  const files = Array.from(input.files);

  if (!fileListMap[warnaIndex]) {
    fileListMap[warnaIndex] = [];
  }

  fileListMap[warnaIndex].push(...files);
  renderFileList(warnaIndex);
});

function renderFileList(warnaIndex) {
  const listContainer = document.getElementById(`fileList_${warnaIndex}`);
  if (!listContainer) return;
  listContainer.innerHTML = "";

  fileListMap[warnaIndex]?.forEach((file, idx) => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      <span>${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)</span>
      <button type="button" onclick="removeFile(${warnaIndex}, ${idx})">❌</button>
    `;
    listContainer.appendChild(div);
  });
}

function removeFile(warnaIndex, fileIndex) {
  fileListMap[warnaIndex].splice(fileIndex, 1);
  renderFileList(warnaIndex);
}