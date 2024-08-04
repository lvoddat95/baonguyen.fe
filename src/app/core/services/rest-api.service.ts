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

  // Upload file
  upload(file: any): Observable<any> {
    return this.http.post(GlobalComponent.upload, file);
  }

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
      GlobalComponent.product,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }

  // Product Delete
  deleteProductData(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.productDelete + id,
      { responseType: "text" }
    );
  }

  // Product Detail
  getProductById(id_product: number): Observable<any> {
    return this.http.post(
      GlobalComponent.productDetail,
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
      GlobalComponent.category,
      { data: JSON.stringify({ danh_muc: danh_muc }) },
      httpOptions
    );
  }
  getCategoryLv2Data(ma_cap_1: string): Observable<any> {
    return this.http.post(
      GlobalComponent.categoryLv2,
      { data: JSON.stringify({ ma_cap_1: ma_cap_1 }) },
      httpOptions
    );
  }
  // Thêm mới Danh mục
  insertCategory(
    ten: string,
    danh_muc: string,
    anh: string = "",
  ): Observable<any> {
    const data = [{
      ten: ten,
      danh_muc: danh_muc,
      anh: anh,
    }];
    return this.http.post(
      GlobalComponent.categoryInsert,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }

  insertCategoryLv2(
    ten: string,
    ma_cap_1: string,
    anh: string = "",
  ): Observable<any> {
    const data = [{
      ten: ten,
      ma_cap_1: ma_cap_1,
      anh: anh,
    }];
    return this.http.post(
      GlobalComponent.categoryLV2Insert,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }


  // Xoá danh mục
  deleteCategogy(
    id: number,
  ): Observable<any> {
    return this.http.post(
      GlobalComponent.categoryDelete,
      { data: JSON.stringify({ id: id }) },
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
      GlobalComponent.order,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }
  // Order Detail
  getOrderById(id_don: number): Observable<any> {
    return this.http.post(
      GlobalComponent.orderDetail,
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
      GlobalComponent.orderStatus,
      { data: JSON.stringify(data) },
      httpOptions
    );
  }


}
