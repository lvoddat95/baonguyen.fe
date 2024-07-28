export interface CategoryModel {
  id: string;
  ma: string;
  ten: string;
  anh?: any;
  cake_menu: any[]; // or the appropriate type for cake_menu
  accessory_menu: any[];
  snack_menu: any[];
}