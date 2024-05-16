export interface BillboardData {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Program {
  id: string;
  name: string;
  billboard: BillboardData;
};

export interface Type {
  id: string;
  name: string;
  value: string;
};

export interface Image {
  id: string;
  url: string;
}


export interface Product {
  id: string;
  program: Program;
  name: string;
  price: string;
  imageUrl: string;
  isFeatured: boolean;
  type: Type;
  images: Image[]
};