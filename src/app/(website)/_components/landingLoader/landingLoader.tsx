import { Box, CircularProgress } from "@mui/material";

export default function LandingLoader() {
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
      <CircularProgress />
    </Box>
  );
}
