"use client";
import { Box, Stack, Typography } from "@mui/material";
import MemberTypeCard from "./MemberTypeCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  type: string;
}

const MemberType = ({ type }: IProps) => {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  return (
    <Box
      component="div"
      justifyContent="center"
      alignItems="center"
      display="flex"
      height="100%"
    >
      <Box
        component="div"
        sx={{
          width: "80%",
          height: "80%",
          border: "1px solid grey",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4" textAlign="center">
          {type == "login"
            ? "Login as a User or Artist"
            : "Join as a User or Artist"}
        </Typography>
        <Stack direction="row" spacing={4} marginBottom="12px">
          <MemberTypeCard
            img="/signup-type-user.svg"
            txt="I am a User"
            index={1}
            selected={selected}
            onClick={() => setSelected(1)}
          />
          <MemberTypeCard
            img="/signup-type-artist.svg"
            txt="I am an Artist"
            index={2}
            selected={selected}
            onClick={() => setSelected(2)}
          />
        </Stack>
        <Button
          disabled={selected === 0}
          onClick={() => {
            if (selected == 1) {
              type == "login"
                ? router.push("/login?type=user")
                : router.push("/signup?type=user");
            } else if (selected == 2) {
              type == "login"
                ? router.push("/login?type=artist")
                : router.push("/signup?type=artist");
            }
          }}
        >
          {type == "login" ? "Login" : "Create Account"}
        </Button>
        {type == "signup" && (
          <Typography
            component="h1"
            variant="body1"
            textAlign="center"
            fontWeight="bold"
          >
            Already have an account?
            <Typography
              component="span"
              variant="body1"
              textAlign="center"
              color="#6C63FF"
            >
              <Link href=""> Log in</Link>
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MemberType;
