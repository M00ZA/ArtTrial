import { Box, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
interface IProps {
  price: number;
  title: string;
  name: string;
  description: string;
  id: string;
}

export default function AuctionTxt({
  price,
  title,
  description,
  id,
  name,
}: IProps) {
  return (
    <Box
      component="div"
      sx={{
        padding: "12px",
        minHeight: "200px",
        // height: "100%",
      }}
    >
      <Typography
        component="h3"
        variant="body1"
        marginBottom={".4rem"}
        fontWeight={"bold"}
      >
        {title}
      </Typography>
      <Typography component="p" variant="body1" marginBottom={".4rem"}>
        {description}
      </Typography>
      <Typography
        component="p"
        variant="body2"
        color="#7469B6"
        display="flex"
        alignItems={"center"}
        gap={"4px"}
      >
        <MonetizationOnIcon />
        {price}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        marginBottom={".4rem"}
        textAlign={"right"}
      >
        {name}
      </Typography>

      <Typography component="p" variant="body2" marginBottom={".4rem"}>
        {/* {category || "oil"} */}
      </Typography>
    </Box>
  );
}
