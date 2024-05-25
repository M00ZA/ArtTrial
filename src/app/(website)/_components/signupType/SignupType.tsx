"use client";
import { Box, Stack, Typography } from "@mui/material";
import SignupTypeCard from "./SignupTypeCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const SignupType = () => {
  const [selected, setSelected] = useState(0);
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
          Join as a User or Artist
        </Typography>
        <Stack direction="row" spacing={4} marginBottom="12px">
          <SignupTypeCard
            img="/signup-type-user.svg"
            txt="I am a User"
            index={1}
            selected={selected}
            onClick={() => setSelected(1)}
          />
          <SignupTypeCard
            img="/signup-type-artist.svg"
            txt="I am an Artist"
            index={2}
            selected={selected}
            onClick={() => setSelected(2)}
          />
        </Stack>
        <Button disabled={selected === 0}>Create Account</Button>
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
      </Box>
    </Box>
  );
};

export default SignupType;
