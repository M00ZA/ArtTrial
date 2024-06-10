import { Stack, Typography } from "@mui/material";

interface IProps {
  prop: string;
  value: string | number;
}

export default function OrderItem({ prop, value }: IProps) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        //   justifyContent: "space-between",
        //   justifySelf: "flex-end",
        // padding: "20px 0",
        gap: "8px",
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
        {`${prop}: `}
      </Typography>
      <Typography
        component="p"
        variant="body2"
        // marginBottom={".4rem"}
        // fontWeight={"bold"}
        // fontSize={"1.2rem"}
        color="#7469B6"
      >
        {value}
      </Typography>
    </Stack>
  );
}
