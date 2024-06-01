"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarDropdown from "../avatarDropdown/AvatarDropdown";
const Header = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  return (
    <Stack
      component="nav"
      direction="row"
      sx={{
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#FFFFFF",
        position: "sticky",
        top: 0,
        width: "100%",
        borderBottom: "4px double #50c4a273",
        zIndex: 1000,
      }}
    >
      <Image alt="Logo" src="/logo.png" width={75} height={75} />
      <MenuIcon
        sx={{
          display: { md: "none", xs: "initial" },
          margin: "0 auto",
        }}
        fontSize="large"
        onClick={() => setShow((prevState) => !prevState)}
      />
      <Stack
        component="ul"
        direction={{ md: "row", xs: "column" }}
        spacing={{ lg: 8, xs: 2 }}
        sx={{
          margin: "0 auto",
          position: { xs: "absolute", md: "initial" },
          left: 0,
          top: "73px",
          width: { xs: "100%", md: "auto" },
          alignItems: { xs: "center", md: "initial" },
          paddingRight: { xs: "95px", md: "0" },
        }}
        display={{ md: "flex", xs: show ? "flex" : "none" }}
      >
        <Box component="li">
          <Link href={"/"}>
            <Typography
              component="p"
              sx={{
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              Home
            </Typography>
          </Link>
        </Box>
        <Box component="li">
          <Link href={"/gallery"}>
            <Typography
              component="p"
              sx={{
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              Gallery
            </Typography>
          </Link>
        </Box>
        <Box component="li">
          <Link href={"/events"}>
            <Typography
              component="p"
              sx={{
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              Events
            </Typography>
          </Link>
        </Box>
        {/* <Box component="li">
            <Link href={""}>
              <Typography
                component="p"
                sx={{
                  "&:hover": {
                    color: "blue",
                  },
                }}
              >
                Events
              </Typography>
            </Link>
          </Box> */}
      </Stack>
      {/* <Box component="div"  sx={{marginLeft:{xs:"auto",md:"0"}}}> */}
      <ShoppingCartIcon fontSize="medium" sx={{ marginRight: "22px" }} />
      <AvatarDropdown />
      <Button
        className="w-fit"
        style={{ padding: "0px 40px" }}
        onClick={() => {
          router.push("/loginType");
        }}
      >
        Login
      </Button>
      {/* </Box> */}
    </Stack>
  );
};

export default Header;
