import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ServiceItem from "./ServicesItem";

export default function Services() {
  return (
    <>
      <Typography
        component="h2"
        variant="h4"
        textAlign={"center"}
        position={"relative"}
        paddingBottom={"20px"}
        lineHeight={"4rem"}
        sx={{
          "&::after": {
            content: '""',
            display: "block",
            width: "40px",
            height: "2px",
            backgroundColor: "#757575",
            left: "50%",
            // margin: "0 auto",
            translate: "-50% 0",
            position: "absolute",
          },
        }}
      >
        Our Services
      </Typography>
      <Box component={"ul"}>
        {/* <Box
          component={"li"}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component="div" flexBasis={"50%"}>
            <Image
              src={"/services-1.svg"}
              alt="hero"
              width={500}
              height={500}
              style={{ margin: "0 auto" }}
            />
          </Box>

          <Typography
            component="p"
            variant="h4"
            flexBasis={"50%"}
            maxWidth={"380px"}
          >
            Virtual Space For Exhibting And Selling Work
          </Typography>
        </Box> */}
        <ServiceItem
          src={"/services-1.svg"}
          txt="Virtual Space For Exhibting And Selling Work"
          reverse={false}
        />

        <ServiceItem
          src={"/services-2.svg"}
          txt="We Were The First Auction House to Host a Digital Art Sale in Africa"
          reverse={true}
        />

        <ServiceItem
          src={"/services-3.svg"}
          txt="Everyone In World Can Engage With And Buy The Art Online"
          reverse={false}
        />

        <ServiceItem
          src={"/services-4.svg"}
          txt="You Can Attend Any Exhibition From Anywhere Using VR Technology"
          reverse={true}
        />
      </Box>
    </>
  );
}
