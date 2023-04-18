export interface Category {
  id: number;
  category: string;
  subCategory: string;
}

export interface SuggestedProduct {
  banerimage: string;
  category: Category;
}

export interface NavigationItem {
  category: string;
  subCategories: string[];
}

export interface CategoryResponse {
  id: number;
  category: string;
  subCategory: string;
}

export interface Offer {
  id: number;
  title: string;
  discount: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  productCategory: Category;
  offer: Offer;
  price: number;
  quantity: number;
  imageName: string;
}
