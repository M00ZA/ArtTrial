import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  imgUrl: string;
  title: string;
  name: string;
  category: string;
  id: string;
}

export default function VerticalCard({
  imgUrl,
  title,
  name,
  category,
  id,
}: IProps) {
  const router = useRouter();
  return (
    <Box
      component="div"
      sx={{
        border: "2px solid gray",
        overflow: "hidden",
        // maxWidth: "180px",
        width: "300px",
        borderRadius: "12px 12px 6px 6px",
        boxShadow: 1,
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/gallery/${id}`);
      }}
    >
      <Box component="div" borderBottom="1px solid gray" height={"200px"}>
        {/* <Image
          src={imgUrl || "/services-1.svg"}
          alt="exhibtion image"
          height={180}
          width={180}
        /> */}
        <img
          src={imgUrl || "/services-1.svg"}
          alt="img"
          style={{ height: "100%", width: "100%" }}
        />
      </Box>
      <Box
        component="div"
        sx={{
          padding: "12px",
          height: "200px",
        }}
      >
        <Typography
          component="h3"
          variant="body1"
          marginBottom={".4rem"}
          fontWeight={"bold"}
        >
          {title || "Test3 from post..."}
        </Typography>
        <Typography component="p" variant="body1" marginBottom={".4rem"}>
          {name || "Mohamed"}
        </Typography>
        <Typography component="p" variant="body2" marginBottom={".4rem"}>
          {category || "oil"}
        </Typography>
      </Box>
    </Box>
  );
}
