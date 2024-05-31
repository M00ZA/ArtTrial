import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Services from "./Services";

export default function Home() {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          alignItems: "center",
          padding: "20px",
          borderBottom: "2px solid #DBB97B",
        }}
      >
        <Box component="div" marginX="auto">
          <Typography
            component="h2"
            variant="h5"
            fontSize={{ sm: "27px", md: "38px" }}
          >
            This is your right destination{" "}
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            fontSize={{ sm: "27px", md: "38px" }}
            marginLeft="4rem"
          >
            if you love{" "}
            <Typography
              component={"span"}
              variant="h5"
              color="#7469B6
"
            >
              ART
            </Typography>{" "}
            and drawing{" "}
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            fontSize={{ xs: "27px", md: "38px" }}
          >
            Allow yourself to be{" "}
            <Typography
              component={"span"}
              variant="h5"
              color="#7469B6
"
            >
              creative
            </Typography>{" "}
          </Typography>
        </Box>
        <Image src={"/landing-hero.svg"} alt="hero" width={500} height={500} />
      </Stack>
      <Services />
    </>
  );
}
