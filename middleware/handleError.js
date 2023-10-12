const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  }

  // 400
  else if (err.name === "Email/Password Salah") {
    code = 401;
    message = "Email/Password Salah";
  } else if (err.name === "Mohon Masukkan Password") {
    code = 400;
    message = "Mohon Masukkan Password";
  } else if (err.name === "Mohon Masukkan Email") {
    code = 400;
    message = "Mohon Masukkan Email";
  } else if (err.name === "Mohon Masukkan Nomor Telepon") {
    code = 400;
    message = "Mohon Masukkan Nomor Telepon";
  } else if (err.name === "Nomor Telepon Tidak Terdaftar") {
    code = 400;
    message = "Nomor Telepon Tidak Terdaftar";
  } else if (err.name === "Nomor Telepon Sudah Terdaftar") {
    code = 400;
    message = "Nomor Telepon Sudah Terdaftar";
  } else if (err.name === "Maaf Saldo Tidak Cukup") {
    code = 400;
    message = "Maaf Saldo Tidak Cukup";
  } else if (err.name === "Maaf Kuota Diklat Sudah Penuh") {
    code = 400;
    message = `Maaf Kuota Diklat ${err.diklat} Sudah Penuh`;
  } else if (err.name === "Maaf Kuota Kelas Tahsin Sudah Penuh") {
    code = 400;
    message = `Maaf Kuota Kelas Tahsin ${err.kelas} Sudah Penuh`;
  } else if (err.name === "Mohon Bersabar, Data Kamu Lagi Diproses") {
    code = 400;
    message = "Mohon Bersabar, Data Kamu Lagi Diproses";
  }

  // 404
  else if (err.name === "Id User Tidak Ditemukan") {
    code = 404;
    message = "Id User Tidak Ditemukan";
  } else if (err.name === "Id Diklat Tidak Ditemukan") {
    code = 404;
    message = "Id Diklat Tidak Ditemukan";
  } else if (err.name === "Id Divisi Tidak Ditemukan") {
    code = 404;
    message = "Id Divisi Tidak Ditemukan";
  } else if (err.name === "Id Kajian Tidak Ditemukan") {
    code = 404;
    message = "Id Kajian Tidak Ditemukan";
  } else if (err.name === "Id Kategori Kajian Tidak Ditemukan") {
    code = 404;
    message = "Id Kategori Kajian Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Kegiatan Tidak Ditemukan") {
    code = 404;
    message = "Id Kegiatan Tidak Ditemukan";
  } else if (err.name === "Id Kelas Tahsin Anak Tidak Ditemukan") {
    code = 404;
    message = "Id Kelas Tahsin Anak Tidak Ditemukan";
  } else if (err.name === "Id Kelas Tahsin Dewasa Tidak Ditemukan") {
    code = 404;
    message = "Id Kelas Tahsin Dewasa Tidak Ditemukan";
  } else if (err.name === "Id Pengajar Tahsin Tidak Ditemukan") {
    code = 404;
    message = "Id Pengajar Tahsin Tidak Ditemukan";
  } else if (err.name === "Id Peserta Tahsin Anak Tidak Ditemukan") {
    code = 404;
    message = "Id Peserta Tahsin Anak Tidak Ditemukan";
  } else if (err.name === "Id Peserta Tahsin Dewasa Tidak Ditemukan") {
    code = 404;
    message = "Id Peserta Tahsin Dewasa Tidak Ditemukan";
  } else if (err.name === "Id Peserta Diklat Tidak Ditemukan") {
    code = 404;
    message = "Id Peserta Diklat Tidak Ditemukan";
  } else if (err.name === "Id Rekening Donasi Tidak Ditemukan") {
    code = 404;
    message = "Id Rekening Donasi Tidak Ditemukan";
  } else if (err.name === "Id Uang Masuk Tidak Ditemukan") {
    code = 404;
    message = "Id Uang Masuk Tidak Ditemukan";
  } else if (err.name === "Id Uang Keluar Tidak Ditemukan") {
    code = 404;
    message = "Id Uang Keluar Tidak Ditemukan";
  } else if (err.name === "Id Layanan Tidak Ditemukan") {
    code = 404;
    message = "Id Layanan Tidak Ditemukan";
  } else if (err.name === "Id Link Kajian Tidak Ditemukan") {
    code = 404;
    message = "Id Link Kajian Tidak Ditemukan";
  }
  //
  else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  } else if (err.name === "Id Ustadz Tidak Ditemukan") {
    code = 404;
    message = "Id Ustadz Tidak Ditemukan";
  }

  // 401
  else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Tidak Sesuai";
  } else if (err.name === "TokenExpiredError") {
    code = 401;
    message = "Token telah kedaluwarsa. Silakan masuk kembali";
  } else if (err.name === "jwt expired") {
    code = 401;
    message = "Token Tidak Sesuai";
  } else if (err.name === "Invalid authorization") {
    code = 401;
    message = "Akses Token Tidak Ada";
  } else if (err.name === "Api Key Tidak Valid") {
    code = 401;
    message = "Api Key Tidak Valid";
  }

  // 403
  else if (err.name === "Forbidden") {
    code = 403;
    message = "Anda Tidak Memiliki Hak Akses";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
