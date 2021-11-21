import { Errback, NextFunction, Response, Request } from "express";

export default (
    err: Errback,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let code: number = 0;
    let name: string = err.name;
    let message: string = "";
    switch (name) {
        case "NOT_FOUND":
            code = 404;
            message = "Data tidak ditemukan!";
            break;
        case "Missing_Token":
            code = 401;
            message = "Akses token hilang!";
            break;
        case "JsonWebTokenError":
            code = 401;
            message = "Akses token tidak Valid!";
            break;
        case "TokenExpiredError":
            code = 401;
            message = "Akses Token Kamu sudah Expired. Harap login ulang!";
            break;
        case "Email_Not_Match":
            code = 401;
            message = "Email yang anda masukan salah!";
            break;
        case "Email_Invalid":
            code = 401;
            message = "Yang anda masukan bukan email!";
            break;
        case "Email_Registered":
            code = 409;
            message = "Email telah digunakan atau terdaftar!";
            break;
        case "Username_Invalid":
            code = 401;
            message =
                "Username harus terdiri dari minimal 8 karakter, berupa alphanumeric, tidak boleh menggunakan simbol, kecuali (.) (_)!";
            break;
        case "Username_Registered":
            code = 409;
            message = "Username telah digunakan atau terdaftar!";
            break;
        case "User_Invalid":
            code = 401;
            message = "Email atau Password tidak Match!";
            break;
        case "Password_Invalid":
            code = 401;
            message =
                "Password harus terdiri dari minimal 8 karakter, berupa alphanumeric, setidaknya satu huruf besar, satu huruf kecil, dan satu angka!";
            break;
        case "Your_Logged":
            code = 200;
            message = "Kamu sudah login!";
            break;
        case "Name_Null":
            code = 400;
            message = "Kamu belum memasukan nama. Data gagal dibuat!";
            break;
        case "Not_Enough":
            code = 401;
            message = "Resource Kamu Tidak Cukup!";
            break;
        case "Name_Used":
            code = 409;
            message = "Nama Telah Digunakan!";
            break;
        case "ID_Not_Found":
            code = 403;
            message = "ID Tidak ditemukan!";
            break;
        case "ID_NOT_PASS":
            code = 403;
            message = "ID User tidak Sesuai!";
            break;
        case "ID_Same":
            code = 403;
            message = "Tidak bisa menyerang ID milik sendiri!";
            break;
        case "Your_Soldier_Low":
            code = 401;
            message =
                "Tidak bisa menyerang karena pasukan kamu kurang dari 50!";
            break;
        case "Your_Resource_Full":
            code = 401;
            message = "Tidak bisa menyerang karena resource kamu kepenuhan!";
            break;
        case "Soldier_Enemy_Low":
            code = 401;
            message =
                "Tidak bisa diserang karena pasukan musuh kurang dari 50!";
            break;
        case "Amount_Full":
            code = 401;
            message = "Jumlah maksimal membuat market/farm/barrack adalah 30!";
            break;
        case "Register_Fail":
            code = 400;
            message = "Kamu sedang login! Register Gagal!";
            break;
        default:
            code = 500;
            message = "Internal Server Error!";
            break;
    }
    res.status(code).json({
        success: false,
        message: message,
    });
};
