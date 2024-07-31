import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalComponent } from "../../global-component";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  }),
};

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  constructor(private http: HttpClient) { }

  /**
   * Product Rest Api
   */
  // Get All
  getProductData(
    phan_loai: string = "",
    id_product: number = 0,
    gia: any = "",
    ma_cap_2: any = "",
  ): Observable<any> {
    const data = {
      phan_loai: phan_loai,
      id_product: id_product,
      gia: gia,
      ma_cap_2: ma_cap_2,
    };
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.product,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }

  // Delete
  deleteProductData(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_URL + GlobalComponent.productDelete + id,
      { responseType: "text" }
    );
  }

  /**
   * Category Rest Api
   */
  // Getl All
  getCategoryData(danh_muc: string): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.category,
      { data: JSON.stringify({ danh_muc: danh_muc }) },
      httpOptions
    );
  }

  /**
  * Order Rest Api
  */
  // Getl All
  getOrderData(
    userid: number = 0,
    role: string = "USER",
  ): Observable<any> {
    const data = {
      userid: userid,
      role: role,
    };
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.order,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }

  updateOrderStatus(
    id_don: number = 0,
    status: string = "",
    user_id: number = 0,
  ): Observable<any> {
    const data = {
      id_don: id_don,
      status: status,
      user_id: user_id,
    };
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.orderStatus,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }


}
