import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
const Footer = () => {
  return (
    <Stack
      component="footer"
      direction="row"
      spacing={2}
      sx={{
        padding: "12px",
        // position: "sticky",
        // bottom: "0",
        // maxHeight: "250px",
        width: "100%",
        // height: "400p",
        // alignItems: "center",
      }}
    >
      <Stack
        component="div"
        direction="column"
        sx={{ flexBasis: { xs: "100%", md: "50%" }, paddingLeft: "30px" }}
      >
        <Image alt="Logo" src="/logo.png" width={100} height={50} />
        <Typography
          component="p"
          variant="h6"
          maxWidth="370px"
          paddingLeft={{ xs: "10px", md: "80px" }}
          fontSize=".9rem"
        >
          Virtual art gallery app provides art enhusiasts and users with a
          seamless and immersive experience
        </Typography>
      </Stack>
      <Stack
        component="div"
        direction={{ xs: "column", md: "row" }}
        sx={{ flexBasis: { xs: 0, md: "50%" } }}
      >
        <Stack component="ul" direction="column" sx={{ flexBasis: "50%" }}>
          <Box component="li">
            <Typography
              component="p"
              variant="body1"
              sx={{
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              <Link href={""}>help</Link>
            </Typography>
          </Box>

          <Box component="li">
            <Typography
              component="p"
              variant="body1"
              sx={{
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              <Link href={""}> contact us</Link>
            </Typography>
          </Box>

          <Box component="li">
            <Typography
              component="p"
              variant="body1"
              sx={{
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              <Link href={""}> FAQ</Link>
            </Typography>
          </Box>
        </Stack>
        <Box component="div" sx={{ flexBasis: "50%" }}>
          <Typography component="p" variant="h6">
            Part with us
          </Typography>
          <Stack component="ul" direction="row" spacing={1}>
            <Link href={""}>
              <FacebookIcon />
            </Link>
            <Link href={""}>
              <TwitterIcon />
            </Link>
            <Link href={""}>
              <InstagramIcon />
            </Link>
            <Link href={""}>
              <GoogleIcon />
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Footer;
