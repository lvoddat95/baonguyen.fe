export interface ProductModel {
  id?: any;
  anh?: any;
  available?: any;
  bonus?: any;
  don_gia?: any;
  mo_ta?: any;
  ma_cap_1?: any;
  ma_cap_2?: any;
  sales?: any;
  ten?: any;
}

export interface OrderModel {
  id?: any;
  sdt?: any;
  dchi?: any;
  tong_diem?: any;
  tong_tien?: any;
  tuoi?: any;
  ngay_nhan?: any;
  id_user?: any;
  trang_thai?: any;
  ngay_nhap?: any;
  ten_sp?: any;
}

// tslint:disable-next-line: class-name
export class ArrayModel {
  id!: number;
  id_product!: number;
  ma!: string;
  ten!: string;
  don_gia!: number;
}

// tslint:disable-next-line: class-name
export class ProductDetailModel {
  prod_info!: ProductModel;
  size?: ArrayModel[];
  nhan?: ArrayModel[];
  tang?: ArrayModel[];
}

export class OrderDetailModel {
  list_product?: any;
  info?: any;
}

export interface categoryModel {
  id: string;
  ma: string;
  ten: string;
  anh?: any;
}
