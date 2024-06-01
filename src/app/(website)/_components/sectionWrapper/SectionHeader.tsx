import { Typography } from "@mui/material";

interface IProps {
  txt: string;
}

export default function SectionHeader({ txt }: IProps) {
  return (
    <Typography
      component="h2"
      variant="h4"
      textAlign={"center"}
      position={"relative"}
      marginBottom={"20px"}
      lineHeight={"4rem"}
      sx={{
        "&::after": {
          content: '""',
          display: "block",
          width: "40px",
          height: "2px",
          backgroundColor: "#757575",
          left: "50%",
          translate: "-50% 0",
          position: "absolute",
        },
      }}
    >
      {txt}
    </Typography>
  );
}
