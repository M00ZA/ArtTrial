import { Box, Typography } from "@mui/material";
import Link from "next/link";

type IProps = {
  href: string;
  label: string;
};

export default function LinkBtn({ href, label }: IProps) {
  return (
    <Box
      component="div"
      sx={{
        paddingBottom: "20px",
        borderBottom: "2px solid #DBB97B",
      }}
    >
      <Link
        href={href}
        style={{
          maxWidth: "200px",
          textAlign: "center",
          margin: "0 auto",
          display: "block",
        }}
      >
        <Typography
          component="p"
          sx={{
            "&:hover": {
              backgroundColor: "rgb(108 99 255 / 90%)",
            },
            background: "rgb(108 99 255)",
            color: "white",
            padding: "8px 14px",
            borderRadius: "4px",
          }}
        >
          {label}
        </Typography>
      </Link>
    </Box>
  );
}
