import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';
import { RestApiService } from './rest-api.service';
import { PaginationService } from './pagination.service';
import { ToastService } from './toast.service';
import { productAvailable, productCategory } from 'src/app/core/data';

@Injectable({
    providedIn: 'root'
})

export class Ultils {
    sanitizer = inject(DomSanitizer);
    restApiService = inject(RestApiService);
    paginationService = inject(PaginationService);
    toastService = inject(ToastService);

    productCategory!: any;

    constructor() {
        this.productCategory = productCategory;
    }

    f_ViewTextCode(data: any, code: string): string {
        if (!data || !Array.isArray(data)) {
            return "Không tìm thấy";
        }
        const item = data.find(
            (menuItem: { ma: string }) => menuItem.ma === code
        );
        return item ? item.ten : "Không tìm thấy";
    }


    f_FormatCurrency(value: string, separator: string = ','): string {
        let input = value.replace(new RegExp(`\\${separator}`, 'g'), '');
        let formattedInput = '';

        if (input) {
            formattedInput = parseFloat(input)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }

        return formattedInput.replace(/,/g, separator);
    }

    f_GetSafeUrl(url: string): SafeUrl {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url; // hoặc 'https://' nếu bạn muốn mặc định
        }
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    // Hàm mã hóa mật khẩu MD5
    md5Encrypt(input: string): string {
        // Mã hóa input thành MD5 và chuyển đổi thành chuỗi hex
        return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
    }



    async getCategoryData(): Promise<{ ma: any; ten: any; parent: null; }[]> {
        const res = await this.restApiService.getCategoryData('').toPromise();
        if (res.code === '000') {
            const mergedData: { ma: any; ten: any; parent: null; }[] = [];
            const prefix = ' — '; // Thêm prefix
            this.productCategory.forEach((parent: { ma: any; ten: any; }) => {
                // Add parent category
                mergedData.push({ ma: parent.ma, ten: parent.ten, parent: null });
    
                // Add children items belonging to the parent category
                res.data.menu
                    .filter((child: { danh_muc: any; }) => child.danh_muc === parent.ma)
                    .forEach((child: any) => {
                        const prefixedTen = `${prefix}${child.ten}`; // Thêm prefix vào ten item con
                        mergedData.push({ ...child, ten: prefixedTen, parent });
                    });
            });
    
            return mergedData;
        } else {
            this.toastService.success(res.message, 'Lỗi!');
            return [];
        }
    }

    async getCategoryLv2Data(): Promise<{ ma: string; ten: string; parent: string | null; anh: string; danh_muc: string }[]> {
        try {
            // Fetch parent category data
            const parentCat = await this.restApiService.getCategoryData('').toPromise();
            // Fetch child category data
            const childCat = await this.restApiService.getCategoryLv2Data('').toPromise();

            // Check if the API response is successful
            if (parentCat.code === '000' && childCat.code === '000') {
                const parentCategories = parentCat.data.menu;  // Assuming 'menu' holds parent categories
                const childCategories = childCat.data;      // Assuming 'data' holds child categories

                // Merging parent and child categories
                const mergedData: { ma: string; ten: string; parent: string | null; anh: string; danh_muc: string }[] = [];

                // Add parent categories to the merged data
                parentCategories.forEach((parent: { ma: string; ten: string; anh: string; danh_muc: string }) => {
                    mergedData.push({ ma: parent.ma, ten: parent.ten, parent: null, anh: parent.anh, danh_muc: parent.danh_muc });

                    // Add corresponding child categories to the merged data
                    childCategories
                        .filter((childItem: { ma_cap_1: string }) => childItem.ma_cap_1 === parent.ma)
                        .forEach((childItem: { ma: string; ten: string; anh: string }) => {
                            mergedData.push({ ma: childItem.ma, ten: childItem.ten, parent: parent.ma, anh: childItem.anh, danh_muc: parent.danh_muc });
                        });
                });

                return mergedData;
            } else {
                // Return an empty array if the response code is not '000'
                return [];
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
            return [];
        }
    }

}
