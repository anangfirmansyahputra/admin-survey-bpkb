export const dateFormat = (date: string) => {
  const dateTime = new Date(date);

  // Mendapatkan jam
  const jam = dateTime.getHours();

  // Mendapatkan menit
  const menit = dateTime.getMinutes();

  // Mendapatkan detik
  const detik = dateTime.getSeconds();

  // Mendapatkan hari (dalam bentuk angka, dimulai dari Minggu)
  const hari = dateTime.getDay();

  // Mendapatkan tanggal
  const tanggal = dateTime.getDate();

  // Mendapatkan nama hari berdasarkan indeks hari (0 untuk Minggu, 1 untuk Senin, dst.)
  const namaHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ][hari];

  // Mendapatkan bulan dalam bentuk angka (dimulai dari 0 untuk Januari)
  const bulan = dateTime.getMonth();

  // Mendapatkan nama bulan berdasarkan indeks bulan
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ][bulan];

  // Mendapatkan tahun
  const tahun = dateTime.getFullYear();

  // Format waktu dalam bahasa Indonesia

  return {
    time: `${jam}:${menit}:${detik}`,
    day: namaHari,
    date: `${tanggal}-${namaBulan}-${tahun}`,
  };
};
