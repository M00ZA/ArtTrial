import { Box, Button, Stack, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartProduct } from "@/actions/users";
import { toast } from "sonner";
import { captilize } from "@/lib/utils";
import * as zod from "zod";
interface IProps {
  imgUrl: string;
  title: string;
  name: string;
  price: string;
  id: string;
  noAction?: boolean;
}

export default function CartItem({
  imgUrl,
  name,
  price,
  title,
  id,
  noAction,
}: IProps) {
  const queryClient = useQueryClient();
  const removeItemMutation = useMutation({
    mutationFn: (values: { id: string }) => deleteCartProduct(values.id),
    onSuccess: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(captilize(d?.response?.data?.message));
      }
      if (d.data?.code === 200) {
        toast.success("item deleted!");
        // router.push("/admin/admins");
        queryClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "all",
        });
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

  const removeFromCartHandler = () => {
    removeItemMutation.mutate({ id });
  };

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "20px",
        borderRadius: "20px",
        gap: "12px",
      }}
    >
      <Box
        component={"div"}
        sx={{
          // flex: 1,
          width: "300px",
          maxHeight: "200px",
          // margin: "0 auto",
          borderRight: "1px solid gray",
          paddingRight: "12px",
        }}
      >
        <img
          src={imgUrl || "/services-1.svg"}
          alt="img"
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        />
      </Box>
      <Stack direction="column" flex={1}>
        <Typography
          component="h3"
          variant="h6"
          marginBottom={".4rem"}
          fontWeight={"bold"}
          // fontSize={"1.2rem"}
          // color="#c9ab81"
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          // marginBottom={".4rem"}
          // fontWeight={"bold"}
          // fontSize={"1.2rem"}
          color="#7469B6"
        >
          {name}
        </Typography>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            justifySelf: "flex-end",
            marginTop: "auto",
            padding: "20px 0",
            borderTop: "1px solid gray",
          }}
        >
          <Typography
            component="p"
            variant="body2"
            // marginBottom={".4rem"}
            // fontWeight={"bold"}
            // fontSize={"1.2rem"}
            color="#7469B6"
          >
            <MonetizationOnIcon />
            {price}
          </Typography>
          {!noAction && (
            <Button
              className="w-fit"
              style={{
                // padding: "1rem 0",
                backgroundColor: "rgb(108 99 255 / 0.9)",
                // margin: "0 auto",
                // display: "inline-block",
                // width: "100%",
              }}
              onClick={(e) => {
                e.preventDefault();
                removeFromCartHandler();
              }}
              variant="contained"
              color="success"
            >
              Remove
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
