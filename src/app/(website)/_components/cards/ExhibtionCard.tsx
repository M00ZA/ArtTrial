import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventIcon from "@mui/icons-material/Event";

interface IProps {
  title: string;
  range: string;
  date: string;
  name: string;
  imgUrl: string;
}

export default function ExhibitionCard({
  title,
  range,
  date,
  name,
  imgUrl,
}: IProps) {
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "0 12px 12px 12px",
          width: "320px",
          backgroundColor: "#EDEDED",
          boxShadow: 2,
          flexShrink: 0,
        }}
      >
        <Box
          component="div"
          height="200px"
          position="relative"
          overflow="hidden"
          borderRadius="0 12px 0 0"
          //   sx={{
          //     backgroundImage: `url(${imgUrl})`,
          //     backgroundPosition: "center",
          //     backgroundSize: "cover",
          //   }}
        >
          <Image
            src={imgUrl}
            alt="exhibtion image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
        <Box component="div" padding={"0 12px 12px 12px"}>
          <Typography
            component="h3"
            variant="body1"
            marginBottom={".4rem"}
            fontWeight={"bold"}
            fontSize={".8rem"}
          >
            {title}
          </Typography>
          <Box component="div" color={"#7469B6"}>
            <Typography
              component="p"
              variant="body2"
              fontSize={".6rem"}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <ScheduleIcon fontSize="small" htmlColor="#757575" />
              {range}
            </Typography>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="p"
                variant="body2"
                fontSize={".6rem"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <EventIcon fontSize="small" htmlColor="#757575" />
                {new Date(date).toLocaleDateString()}
              </Typography>
              <Typography component="p" variant="body2" fontSize={".6rem"}>
                {name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
