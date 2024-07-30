// shared.utils.ts

// Import thư viện crypto-js
import * as CryptoJS from 'crypto-js';

// Hàm mã hóa mật khẩu MD5
export function md5Encrypt(input: string): string {
  // Mã hóa input thành MD5 và chuyển đổi thành chuỗi hex
  return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}

export class Ultils {
  public fviewTextCode(data: any, code: string): string {
    if (!data || !Array.isArray(data)) {
      return "Không tìm thấy";
    }
    const item = data.find(
      (menuItem: { ma: string }) => menuItem.ma === code
    );
    return item ? item.ten : "Không tìm thấy";
  }

}