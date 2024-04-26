export type User = {
  _id: string,
  name: string,
  email: string,
  phoneNumber: string,
  userName?: string,
  profileImg?: Picture,
  accountActive: boolean,
  addresses: Address[],
}

export type Artist = {
  _id: string,
  name: string,
  email: string,
  phone: string,
  userName?: string,
  profileImg?: Picture,
  accountActive: boolean,
  addresses: Address[],
}

export type Address = {
  _id: string,
  address: string,
  alias: string,
  street: string,
  region: string,
  city: string,
  country: string,
  postalCode: string,
  phone: string,
}

export type Admin = {
  id: string,
  nId: string,
  name: string,
  userName: string,
  phone: string,
  profileImg: Picture,
  gender: string,
  role: string,
  }

export type Picture = {
  public_id: string, secure_url: string
}

export type Product = {
  _id: string,
  title: string,
  description: string,
  price: number,
  width: string,
  height: string,
  depth: string,
  material: string,
  isAvailable: boolean,
  coverImage: Picture,
  images: Picture[],
  owner: { _id: string, name: string },
  category: { _id: string, title: string },
  style: { _id: string, title: string },
  subject: { _id: string, title: string },
}

export type Event = {
  _id: string,
  title: string,
  description: string,
  owner: { _id: string, name: string } ,
  duration: number,
  began: string,
  end: string,
  products: Product[],
  createdAt: string,
  updatedAt: string
}

export type Category = {
  _id: string,
  title: string,
  slug: string
}

export type Style = {
  _id: string,
  title: string,
  slug: string
}

export type Subject = {
  _id: string,
  title: string,
  slug: string
}

export type pageParams = {
  page: number;
  size: number;
  sortBy: "userName asc" | "userName desc";
};

