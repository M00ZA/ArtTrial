import { Box } from "@mui/material";

export default function LandingError() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Something went wrong please try again later</p>
    </Box>
  );
}
