"use client";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CartItem from "./CartItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAdminSchema, cartPay } from "@/schema";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as zod from "zod";
import { toast } from "sonner";
import { captilize } from "@/lib/utils";
import { addAdmin } from "@/app/(admin)/_actions/admins";
import { Form, FormLabel } from "@/components/ui/form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  createCashOrder,
  createCheckoutSession,
  getMyCart,
  getProfileAdresses,
} from "@/actions/users";
import { useEffect } from "react";
import { Address, Cart } from "@/types";

export default function CartComponent() {
  const router = useRouter();
  //   const { id } = router.query;
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
    queryClient.invalidateQueries({
      queryKey: ["user", "address"],
      refetchType: "all",
    });
    toast.dismiss();
  }, [pathname]);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => getMyCart(),
  });

  const profileAddressesQuery = useQuery({
    queryKey: ["user", "address"],
    queryFn: () => getProfileAdresses(),
  });

  const cart: Cart = cartQuery.data?.data?.data;
  const addresses: Address[] = profileAddressesQuery.data?.data?.data;

  const addCashMutation = useMutation({
    mutationFn: (values: zod.infer<typeof cartPay>) => {
      const shippingAddress = values?.address;
      const cartId = cart.id;
      if (values.pay == "cash") return createCashOrder(shippingAddress, cartId);
      return createCheckoutSession(shippingAddress, cartId);
    },
    onSuccess: (d: any) => {
      console.log(d);
      if (d?.response?.data?.message) {
        toast.error(captilize(d?.response?.data?.message));
      }
      if (d.data?.code === 201) {
        toast.success("order was made successfully!");
        // router.push("/admin/admins");
        return;
      } else {
        console.log({ d });
      }
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(captilize(error?.response?.data?.message));
      }
    },
  });

  const form = useForm({
    defaultValues: {
      pay: "",
      address: "",
    },
    resolver: zodResolver(cartPay),
  });

  const addAdminHandler = () => {
    // queryClient.invalidateQueries({ queryKey: ["admins"] });
    addCashMutation.mutate(form.getValues());
    console.log(form.getValues());
  };

  if (!cart) {
    return <h1>No cart found</h1>;
  }

  return (
    <Box component="div" sx={{ backgroundColor: "#F6F6F6", height: "100%" }}>
      <Box
        component="div"
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: "22px" }}
      >
        <Typography
          component="h2"
          variant="h5"
          marginBottom={".4rem"}
          fontWeight={"bold"}
          // fontSize={"1.2rem"}
          // color="#c9ab81"
        >
          Your Cart
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} gap="22px">
          <Stack direction="column" gap="12px" flexBasis={"60%"}>
            {cart &&
              cart?.cartItems &&
              cart?.cartItems.length > 0 &&
              cart.cartItems.map((item) => {
                const { price, product } = item;
                const { coverImage, owner, title, id } = product;
                return (
                  <CartItem
                    imgUrl={coverImage?.image}
                    name={owner.name}
                    price={price + ""}
                    title={title}
                    id={id}
                    key={id}
                  />
                );
              })}
          </Stack>
          <Box
            component="div"
            flexBasis={"40%"}
            sx={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addAdminHandler)}
                className="flex flex-col gap-y-3 mt-5 "
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Your Address" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Your Address</SelectLabel>
                                {addresses &&
                                  addresses.length > 0 &&
                                  addresses.map((address) => {
                                    const { alias, id } = address;
                                    return (
                                      <SelectItem value={id}>
                                        {alias}
                                      </SelectItem>
                                    );
                                  })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link href="#">add address</Link>
                </Stack>
                <FormField
                  control={form.control}
                  name="pay"
                  render={({ field }) => (
                    <FormItem>
                      {/* // <FormControl> */}
                      {/* <FormLabel id="demo-controlled-radio-buttons-group">
                        Payment method
                      </FormLabel> */}
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <FormControlLabel
                            value="cash"
                            control={<Radio />}
                            label="Cash"
                          />
                          <MonetizationOnIcon />
                        </Stack>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <FormControlLabel
                            value="card"
                            control={<Radio />}
                            label="Card"
                          />
                          <CreditCardIcon />
                        </Stack>
                      </RadioGroup>
                      {/* // </FormControl> */}
                    </FormItem>
                  )}
                />
                <Button
                  className="w-fit"
                  style={{
                    // padding: "1rem 0",
                    backgroundColor: "rgb(108 99 255 / 0.9)",
                    margin: "0 auto",
                    // display: "inline-block",
                    // width: "100%",
                  }}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  // }}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Checkout
                </Button>
              </form>
            </Form>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
