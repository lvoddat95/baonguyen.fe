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
  // Product Get All
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

  // Product Delete
  deleteProductData(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_URL + GlobalComponent.productDelete + id,
      { responseType: "text" }
    );
  }

  // Product Detail
  getProductById(id_product: number): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.productDetail,
      { data: JSON.stringify({ id_product: id_product }) },
      httpOptions
    );
  }

  /**
   * Category Rest Api
   */
  // Category Getl All
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
  // Order Get All
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
  // Order Detail
  getOrderById(id_don: number): Observable<any> {
    return this.http.post(
      GlobalComponent.API_URL + GlobalComponent.orderDetail,
      { data: JSON.stringify({ id_don: id_don }) },
      httpOptions
    );
  }
  // Order Update Status
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
