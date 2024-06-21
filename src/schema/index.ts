import { isValidDate } from '@/lib/utils';
import { Phone } from 'lucide-react';
import * as z from 'zod'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const AdminLoginSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
}) 

export const EditUserSchema = z.object({
  name: z.string().min(1, { message: "Name of User is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }).regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
  // profileImg: z.any()
})

export const EditArtistSchema = z.object({
  name: z.string().min(1, { message: "Name of Artist is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }).regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
})


export const EditCategorySchema = z.object({
  title: z.string().min(1, { message: "Title of Category is required!" }),
})

export const EditStyleSchema = z.object({
  title: z.string().min(1, { message: "Title of Style is required!" }),
})

export const EditSubjectSchema = z.object({
  title: z.string().min(1, { message: "Title of Subject is required!" }),
})

export const AddAdminSchema = z.object({
  picture: z.any().optional(),
  name: z.string().min(1, { message: "Name of Admin is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }).regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
  username: z.string().min(1, { message: "username is required" }),
  password: z.string().min(8, { message: "Password Must be at least 8 characters" }),
  passwordConfirm: z.string(),
  nId: z.string().min(14, { message: "National ID Must Be 14 Number" }).max(14, { message: "Cannot be more than 14 number" }),
  role: z.string(),
  gender: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export const EditAdminSchema = z.object({
  name: z.string().min(1, { message: "Name of Admin is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }).regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
  role: z.string().min(1,{ message: "Please provide a valid role" }),
  gender: z.string(),
})

export const UpdateAdminImage = z.object({
  profileImg: z.any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Select a picture (Max Size: 5MB).`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
})

export const UpdateMyAdminProfileSchema = z.object({
  name: z.string().min(1, { message: "Name of Admin is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }).regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
  gender: z.string(),
})

export const UpdateMyAdminPassword = z.object({
  currentPassword: z.string().min(1, { message: "Current Password is Required" }),
  password: z.string().min(1, { message: "Phone number is required!" }),
  confirmPassword: z.string().min(1, { message: "Confirmation password is required" }),
}).refine((data) => data.password == data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const EditProductSchema = z.object({
  title: z.string().min(1, { message: "Product title is required!" }),
  description: z.string().min(1, { message: "Product description is required!" }),
  // style: z.string().min(1, { message: "Style is required!" }),
  // isAvailable: z.boolean(),
  // subject: z.string().min(1, { message: "Subject is required!" }),
  price: z.number().gt(0, { message: "Number required in width" }),
  width: z.number().gt(0, { message: "Number required in width" }),
  height: z.number().gt(0, { message: "Number required in height" }),
  depth: z.number().gt(0, { message: "Number required in depth" }),
  material: z.string().min(1, { message: "Material is required!" }),
})

export const EditEventSchema = z.object({
  title: z.string().min(1, { message: "Event title is required!" }),
  description: z.string().min(1, { message: "Event description is required!" }),
  duration: z.number().gt(0, { message: "Number required in duration" }),
  products: z.string().array().optional()
})

export const userLoginSchema = z.object({
  email: z.string().min(1, { message: "email cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
}) 

export const forgetPassword = z.object({
  email: z.string().min(1, { message: "email cannot be empty" })
}) 

export const verifyReset = z.object({
  email: z.string().min(1, { message: "email cannot be empty" }),
  resetCode:  z.string().min(1, { message: "reset code cannot be empty" }),
}) 

export const resetPassword = z.object({
  email: z.string().min(1, { message: "email cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
  passwordConfirm: z.string().min(1, { message: "Password cannot be empty" }),
}).superRefine(({ passwordConfirm, password }, ctx) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordConfirm']
    });
  }
});

export const userSignupSchema =  z.object({
  profileImg: z.any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Select a picture (Max Size: 5MB).`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
  email: z.string().min(1, { message: "email cannot be empty" }),
  name: z.string().min(1, { message: "Name of is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }),
  // .regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
  password: z.string().min(8, { message: "Password Must be at least 8 characters" }),
  passwordConfirm: z.string(),
  gender: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export const verifyEmail = z.object({
  email: z.string().min(1, { message: "email cannot be empty" }),
  activateCode:  z.string().min(1, { message: "activate code cannot be empty" }),
}) 

export const cartPay = z.object({
  address: z.string().min(1, { message: "please select an address" }),
  pay:  z.string().min(1, { message: "please provide a payment method" }),
}) 

// (shippingAddress: string, productId: string)

export const UpdateUserProfile= z.object({
  name: z.string().optional()
    .or(z.literal('')),
  // .min(1, { message: "Name of user is required!" }),
  phone: z.string().optional()
    .or(z.literal('')),
  // .min(1, { message: "Phone number is required!" }).regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid Egyptian number!' }),
  email: z.string().optional()
    .or(z.literal('')),
  // .min(1, { message: "email cannot be empty" }),
  profileImg: z.any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Select a picture (Max Size: 5MB).`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
})

export const userAddressSchema =  z.object({
  alias: z.string().min(1, { message: "alias cannot be empty" }),
  country: z.string().min(1, { message: "country cannot be empty "}),
  phone: z.string().min(1, { message: "Phone number is required!" }),
  region: z.string().min(1, { message: "region cannot be empty "}),
  city: z.string().min(1, { message: "city cannot be empty "}),
  street: z.string().min(1, { message: "street cannot be empty "}),
  postalCode: z.string().min(1, { message: "postalCode cannot be empty "}),
})

export const addEventSchema = z.object({
  title: z.string().min(1, { message: "Event title is required!" }),
  description: z.string().min(100, { message: "Event description is too short!" }),
  duration: z.number().gt(0, { message: "Number required in duration" }),
  began: z.string().min(1, { message: "began date is required" }).refine(began => isValidDate(began),"Began date must be a valid date and in the future"),
  coverImage: z.any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Select a picture (Max Size: 5MB).`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
})

export const addProductSchema = z.object({
  productId: z.string().min(1, { message: "Please select a product to add" })
})