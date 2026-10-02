class Kendaraan {
  constructor(merk, jenis) {
    this.merk = merk;
    this.jenis = jenis;
    this.tersedia = true;
  }
  
  info() {
    return `${this.jenis} ${this.merk}`;
  }
}

class Mobil extends Kendaraan {
  constructor(merk, kapasitasPenumpang) {
    super(merk, "Mobil");
    this.kapasitasPenumpang = kapasitasPenumpang;
  }
  
  info() {
    return `${super.info()} (Kapasitas: ${this.kapasitasPenumpang} orang)`;
  }
}

class Motor extends Kendaraan {
  constructor(merk, adaBagasi) {
    super(merk, "Motor");
    this.adaBagasi = adaBagasi; // boolean
  }
  
  info() {
    return `${super.info()} ${this.adaBagasi ? "dengan bagasi" : "tanpa bagasi"}`;
  }
}

class Pelanggan {
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = null;
  }

  sewaKendaraan(kendaraan) {
    if (this.kendaraanDisewa !== null) {
      console.log(`[Gagal] ${this.nama} sudah menyewa kendaraan dan belum mengembalikannya.`);
      return;
    }

    if (kendaraan.tersedia) {
      this.kendaraanDisewa = kendaraan;
      kendaraan.tersedia = false;
      console.log(`[Transaksi] ${this.nama} berhasil menyewa ${kendaraan.info()}.`);
    } else {
      console.log(`[Gagal] ${kendaraan.info()} sedang tidak tersedia karena sudah disewa.`);
    }
  }

  kembalikanKendaraan() {
    if (this.kendaraanDisewa !== null) {
      console.log(`[Pengembalian] ${this.nama} telah mengembalikan ${this.kendaraanDisewa.info()}.`);
      this.kendaraanDisewa.tersedia = true;
      this.kendaraanDisewa = null;
    } else {
      console.log(`[Gagal] ${this.nama} tidak memiliki kendaraan untuk dikembalikan.`);
    }
  }
}

class SistemSewa {
  constructor() {
    this.pelanggan = [];
  }

  tambahPelanggan(pelanggan) {
    this.pelanggan.push(pelanggan);
  }

  tampilkanPelangganAktif() {
    console.log("\n=== Daftar Pelanggan Yang Sedang Menyewa Kendaraan ===");
    const aktif = this.pelanggan.filter(p => p.kendaraanDisewa !== null);
    
    if (aktif.length === 0) {
      console.log("Tidak ada pelanggan yang sedang menyewa kendaraan.");
    } else {
      aktif.forEach((p, index) => {
        console.log(`${index + 1}. Nama: ${p.nama} | No. Telp: ${p.nomorTelepon} | Kendaraan: ${p.kendaraanDisewa.info()}`);
      });
    }
    console.log("======================================================\n");
  }
}

// --- Contoh Penggunaan (Testing) ---
const sistem = new SistemSewa();

// 1. Inisialisasi Data Kendaraan
const mobilAvanza = new Mobil("Toyota Avanza", 7);
const motorNmax = new Motor("Yamaha Nmax", true);
const mobilBrio = new Mobil("Honda Brio", 5);

// 2. Inisialisasi Data Pelanggan
const pelanggan1 = new Pelanggan("Rizki", "081234567890");
const pelanggan2 = new Pelanggan("Budi", "089876543210");
const pelanggan3 = new Pelanggan("Siti", "085678901234");

// Mendaftarkan pelanggan ke sistem
sistem.tambahPelanggan(pelanggan1);
sistem.tambahPelanggan(pelanggan2);
sistem.tambahPelanggan(pelanggan3);

// 3. Proses Transaksi Penyewaan
pelanggan1.sewaKendaraan(mobilAvanza);
pelanggan2.sewaKendaraan(motorNmax);

// Coba sewa kendaraan yang sudah disewa
pelanggan3.sewaKendaraan(mobilAvanza);

// 4. Menampilkan daftar pelanggan yang sedang menyewa
sistem.tampilkanPelangganAktif();

// 5. Proses Pengembalian Kendaraan
pelanggan1.kembalikanKendaraan();

// 6. Menampilkan daftar setelah pengembalian
sistem.tampilkanPelangganAktif();

// Pelanggan 3 sekarang bisa menyewa mobil Avanza
pelanggan3.sewaKendaraan(mobilAvanza);
sistem.tampilkanPelangganAktif();
