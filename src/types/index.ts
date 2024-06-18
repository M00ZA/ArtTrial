export type User = {
  id: string,
  name: string,
  email: string,
  phone: string,
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
  id: string,
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
  username: string,
  phone: string,
  profileImg: string,
  gender: string,
  role: string,
  userName?:string
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
  owner: { id: string, name: string,
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
  id: string,
  title: string,
  slug: string
}

export type Style = {
  id: string,
  title: string,
  slug: string
}

export type Subject = {
  id: string,
  title: string,
  slug: string
}

export type pageParams = {
  page?: number;
  limit?: number;
  sort?: "username asc" | "username desc";
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



export type Order  =   {
  "id": string,
  "user": {
      "id": string,
      "name": string
  },
  "cartItems": [
      {
          "product": Product
          "price": number
      }
  ],
  "totalOrderPrice": number,
  "paymentMethodType": string,
  "currency": string,
  "isPaid": boolean,
  "paidAt": string|null,
  "orderState": string,
  "isDelivered": boolean,
  "deliveredAt": string|null
}

export type OrderById = Order&{shippingAddress:Address}

export type Auction = {
  id: string,
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
  artist: { id: string, name: string ,profileImg:string},
  category: string,
  style: string,
  subject: string,
  size:string,
  duration:number,
  began:string,
  end:string,
  finalUser:{
    id:string,
    name:string
  },
  isLaunch:boolean,
  isEnded:boolean,
  userRegisteredInThisAuction:boolean,
  lastPrices:Array<{
    user:{ id:string ,
       name:string} , 
    price:number}>

}

///Admin

export type GetCategoriesResponse =GeneralApiResponse<Array<Partial<Category>>>
export type GetStylesResponse =GeneralApiResponse<Array<Partial<Style>>>
export type GetSubjectsResponse =GeneralApiResponse<Array<Partial<Subject>>>
export type GetAdminsResponse = GeneralApiResponse<{admins:Array<Admin>,pagination:AdminPagination}>
export type GetUsersResponse = GeneralApiResponse<{users:Array<User>,pagination:AdminPagination}>

export type GeneralApiResponse<T> = {
  status: string,
  code: number,
  message: string,
  data:T
}

export type AdminPagination = {
  currentPage: number,
limit:number,
numbersOfPages: number,
totalResults: number
}