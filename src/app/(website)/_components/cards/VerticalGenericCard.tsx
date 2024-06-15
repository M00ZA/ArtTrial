import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface IProps {
  url: string;
  imgUrl: string;
  title: string;
  name: string;
  category: string;
  id: string;
}

export default function VerticalGenericCard({
  url,
  imgUrl,
  title,
  name,
  category,
  id,
  children,
}: PropsWithChildren<IProps>) {
  const router = useRouter();
  return (
    <Box
      component="div"
      sx={{
        border: "2px solid gray",
        overflow: "hidden",
        // maxWidth: "180px",
        width: "400px",
        borderRadius: "12px 12px 6px 6px",
        boxShadow: 1,
        cursor: "pointer",
        height: "100%",
      }}
      onClick={() => {
        router.push(`/${url}/${id}`);
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
      {children ? (
        <>{children}</>
      ) : (
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
      )}
    </Box>
  );
}
