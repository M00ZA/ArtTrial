import { Box, Typography } from "@mui/material";
import Image from "next/image";

type Iprops = {
  img: string;
  txt: string;
  index: number;
  selected: number;
  onClick: () => void;
};

const SignupTypeCard = ({ img, txt, index, selected, onClick }: Iprops) => {
  const isActive = index === selected;
  return (
    <Box
      component="div"
      sx={{
        width: "400px",
        height: "250px",
        border: isActive ? "1px solid #6C63FF" : "1px solid grey",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      onClick={onClick}
    >
      <Box
        component="div"
        sx={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: isActive ? "#6C63FF" : "white",
          border: isActive ? "2px solid #6C63FF" : "2px solid #D0CCD0",
          position: "absolute",
          right: "20px",
          top: "10px",
        }}
      ></Box>
      <Image alt="cardimg" src={img} width={120} height={100} />
      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
        color={isActive ? "#6C63FF" : "#D0CCD0"}
        lineHeight="1.5"
      >
        {txt}
      </Typography>
    </Box>
  );
};

export default SignupTypeCard;
