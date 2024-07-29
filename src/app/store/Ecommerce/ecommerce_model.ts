export interface ProductModel {
  id?: any;
  anh?: any;
  available?: any;
  bonus?: any;
  don_gia?: any;
  mo_ta?: any;
  phan_loai?: any;
  ten?: any;
}

export interface OrdersModel {
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
export class arrayModel {
  key!: string;
  value!: string;
}

// tslint:disable-next-line: class-name
export class productListModel {
  id!: number;
  name!: string;
  category!: string;
  seller!: string;
  published!: string;
  ratings = 0;
  reviewCount = 0;
  price?: number;
  orders!: number;
  stocks!: number;
  revenue!: number;
  sizes?: arrayModel[];
  colors?: arrayModel[];
  description!: string;
  features!: string[];
  services!: string[];
  images!: string[];
  colorVariant!: arrayModel[];
  manufacture_name?: string;
  manufacture_brand?: string;
}

export interface categoryModel {
  id: string;
  ma: string;
  ten: string;
  anh?: any;
}

export interface customerModel {
  _id: any;
  customer: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  statusClass: string;
  isSelected?: any;
}

export interface CartModel {
  image: string;
  name: string;
  color: string;
  size: string;
  price: string;
  quantity: number;
  total: string;
  id: string;
}

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexLegend,
  ApexAnnotations,
  ApexTheme,
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;
  markers?: ApexMarkers;
  colors?: string[];
  fill?: ApexFill;
  yaxis?: ApexYAxis | ApexYAxis[];
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
  annotations?: ApexAnnotations;
  labels?: string[] | number[];
  toolbar?: any;
  subtitle?: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions;
  theme?: ApexTheme;
};

export interface sellerModel {
  image: string;
  name: string;
  sellername: string;
  stock: string;
  ballence: string;
  category: string;
}
