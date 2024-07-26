export interface Products {
  _id?: string | number | undefined;
  id?: number | string | undefined;
  title: string;
  description?: string;
  price: number;
  thumbnail?: string;
  qty?: number;
}
