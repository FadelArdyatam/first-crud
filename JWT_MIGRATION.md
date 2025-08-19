# Migrasi dari UUID Token ke JWT

## Perubahan yang Dilakukan

### 1. Instalasi Dependensi
- Menambahkan `@nestjs/jwt` dan `jsonwebtoken` untuk menangani JWT
- Menambahkan `@types/jsonwebtoken` untuk TypeScript support

### 2. Service JWT Baru
- Membuat `src/common/jwt.service.ts` untuk menangani:
  - Pembuatan token JWT
  - Verifikasi token JWT
  - Decode token JWT

### 3. Update Common Module
- Menambahkan `JwtModule` ke `src/common/common.module.ts`
- Mengkonfigurasi JWT dengan secret key dan expiration time (24 jam)
- Mengekspor `JwtService` untuk digunakan di seluruh aplikasi

### 4. Update Auth Middleware
- Mengubah `src/common/auth.middleware.ts` untuk:
  - Menerima token dengan format `Bearer <token>`
  - Memverifikasi JWT token
  - Mengambil user berdasarkan username dari payload JWT

### 5. Update User Service
- Mengubah `src/user/user.service.ts` untuk:
  - Menghapus penggunaan UUID
  - Menggunakan JWT service untuk generate token
  - Menghapus penyimpanan token di database
  - Mengupdate logout method (tidak perlu update database)

### 6. Update Database Schema
- Menghapus kolom `token` dari model `User` di `prisma/schema.prisma`
- Token tidak lagi disimpan di database karena JWT bersifat stateless

### 7. Update Tests
- Mengupdate semua test di `test/user.spec.ts` untuk:
  - Login terlebih dahulu untuk mendapatkan JWT token
  - Menggunakan format `Bearer <token>` di header Authorization
  - Menghapus referensi ke token yang disimpan di database

### 8. Update Documentation
- Mengupdate `doc/user.md` dan `doc/contact.md` untuk:
  - Menunjukkan format token JWT
  - Mengubah format Authorization header menjadi `Bearer <jwt_token>`

## Keuntungan JWT

1. **Stateless**: Tidak perlu menyimpan token di database
2. **Scalable**: Bisa digunakan di multiple server tanpa shared session
3. **Self-contained**: Token berisi semua informasi yang diperlukan
4. **Expiration**: Token otomatis expired setelah waktu tertentu
5. **Security**: Lebih aman karena menggunakan cryptographic signature

## Konfigurasi Environment

Tambahkan variabel environment berikut:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Cara Penggunaan

1. **Login**: User login dan menerima JWT token
2. **Request**: Setiap request menggunakan header `Authorization: Bearer <jwt_token>`
3. **Verification**: Middleware memverifikasi token dan mengekstrak user info
4. **Logout**: Client menghapus token (tidak perlu update database)

## Testing

Untuk menjalankan test:
```bash
npm test
```

Test akan otomatis login untuk mendapatkan JWT token dan menggunakannya untuk request yang memerlukan authentication. 