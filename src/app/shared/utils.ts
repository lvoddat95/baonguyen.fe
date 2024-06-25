// shared.utils.ts

// Import thư viện crypto-js
import * as CryptoJS from 'crypto-js';

// Hàm mã hóa mật khẩu MD5
export function md5Encrypt(input: string): string {
  // Mã hóa input thành MD5 và chuyển đổi thành chuỗi hex
  return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}

// Hằng số, ví dụ như URL endpoint
export const apiUrl = 'https://example.com/api';