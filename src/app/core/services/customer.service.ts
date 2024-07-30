import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
};

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }

    // Cập nhập Bonus
    updateBonusForUser(
        sdt: string = "",
        thanh_tien: number = 0,
    ): Observable<any> {
        const data = {
            sdt: sdt,
            thanh_tien: thanh_tien,
        };
        return this.http.post(
            GlobalComponent.AUTH_API + GlobalComponent.customerUpdateBonus,
            { data: JSON.stringify(data) },
            httpOptions
        );
    }

}
