export type User = {
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  userName?: string,
  profileImg?: string,
  accountActive: boolean,
  addresses: Address[],
}

export type Artist = {
  id: string,
  name: string,
  email: string,
  phone: string,
  userName?: string,
  profileImg?: string,
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
  profileImg: string,
  gender: string,
  role: string,
  }

export type Picture = {imageId:string,image:string}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
  width: string,
  height: string,
  depth: string,
  material: string,
  isAvailable: boolean,
  coverImage: {imageId:string,image:string},
  images: Picture[],
  owner: { id: string, name: string },
  category: string,
  style: string,
  subject: string,
  size:string
}

export type Event = {

  title: string,
  description: string,
  owner: { _id: string, name: string,
    profileImg?:string } ,
  duration: number,
  began: string,
  end: string,
  products:Array<Omit<Product,"coverImage">&{coverImage:string}>,
  createdAt: string,
  updatedAt: string,
  coverImage?:string,
  id:string
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

export type userBookedEvent ={
  id: string,
  events: [
      {
          id: string,
          title: string,
          description: string,
          duration: number,
          began: string,
          end: string,
          isLaunch: boolean,
          coverImage:string,
          ownerId: string,
          ownerName: string,
          profileImg: string
      }
  ]
}

export type IPaginationParams = {
  page?:number,
  limit?:number,
  sort?:string,
  "duration[lte]"?:number,
  "duration[gte]"?:number
}

export type Cart ={
  id: string,
  itemCount:number,
  user:{
    id:string,
    name: string
  },
  totalCartPrice:number,

  cartItems: Array<CartItem>
}

export type CartItem ={
  product:Product,
  price:number
}



