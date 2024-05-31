import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface IProps {
  reverse: boolean;
  src: string;
  txt: string;
}

export default function ServiceItem({ reverse, src, txt }: IProps) {
  return (
    <Box
      component={"li"}
      sx={{
        display: "flex",
        flexDirection: {
          xs: reverse ? "column" : "column",
          md: reverse ? "row-reverse" : "row",
        },
        gap: { xs: "1rem", md: "6rem" },
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <Box component="div" flexBasis={"1"}>
        <Image
          src={src}
          alt="hero"
          width={500}
          height={500}
          style={{ margin: reverse ? "0 auto" : "" }}
        />
      </Box>
      <Box component="div" flexBasis={"1"}>
        <Typography
          component="p"
          variant="h4"
          maxWidth={"380px"}
          fontSize={{ xs: "27px", md: "38px" }}
        >
          {txt}
        </Typography>
      </Box>
    </Box>
  );
}
