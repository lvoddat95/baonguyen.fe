// pagination.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    pageSize: any = 8;
    page: any = 1;
    direction: any = 'asc';
    startIndex: number = 1;
    endIndex: number = 9;

    // Pagination
    changePage(alldata: any[]) {
        const startItem = (this.page - 1) * this.pageSize + 1;
        const endItem = (this.page - 1) * this.pageSize + this.pageSize;
        this.endIndex = endItem;
        if (this.endIndex > alldata.length) {
            this.endIndex = alldata.length;
        }
        return alldata.slice(startItem - 1, endItem);
    }

    onSort(column: any, dataList: any[]) {
        if (this.direction == 'asc') {
            this.direction = 'desc';
        } else {
            this.direction = 'asc';
        }
        const sortedArray = [...dataList]; // Create a new array
        sortedArray.sort((a, b) => {
            const res = this.compare(a[column], b[column]);
            return this.direction === 'asc' ? res : -res;
        });
        return sortedArray; // No need to assign to dataList as you're returning the sorted array
    }

    compare(v1: string | number | boolean, v2: string | number | boolean) {
        if (typeof v1 === 'boolean' && typeof v2 === 'boolean') {
            return v1 === v2 ? 0 : v1 ? 1 : -1;
        }
        if (typeof v1 === 'string' && typeof v2 === 'string') {
            return v1.localeCompare(v2);
        }
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }


}
