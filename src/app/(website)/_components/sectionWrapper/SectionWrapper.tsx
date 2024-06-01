import { Box, Pagination, Typography } from "@mui/material";
import SectionHeader from "./SectionHeader";
import { ChangeEvent, PropsWithChildren } from "react";
import Link from "next/link";

interface IProps {
  txt: string;
  seeMore?: string;
  paginated?: boolean;
  count?: number;
  page?: number;
  handleChange?: (event: ChangeEvent<unknown>, page: number) => void;
}
export default function SectionWrapper({
  txt,
  seeMore,
  paginated,
  count,
  page,
  handleChange,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <>
      <Box
        component="section"
        sx={{
          padding: "20px",
          borderBottom: "2px solid #DBB97B",
        }}
      >
        <SectionHeader txt={txt} />

        {/* <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            // justifyContent: "space-evenly",
            // flexWrap: "wrap",
            gap: { xs: "1.6rem", md: "4rem" },
            margin: "0 auto",
          }}
        >
          {children}
        </Box> */}
        <Box
          component="section"
          sx={{
            display: "grid",
            // flexDirection: { xs: "column", md: "row" },
            // alignItems: "center",
            // justifyContent: "space-evenly",
            // flexWrap: "wrap",
            // gap: { xs: "1.6rem", md: "4rem" },
            // margin: "0 auto",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            placeItems: "center",
            gap: "1.6rem",
          }}
        >
          {children}
        </Box>

        {seeMore && (
          <Typography
            component="p"
            variant="body2"
            fontSize={".6rem"}
            marginTop=".6rem"
            textAlign="center"
            color={"#7469B6"}
          >
            <Link href={seeMore}>See More</Link>
          </Typography>
        )}
        {paginated && (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "1.2rem 0 0 0",
            }}
          >
            <Pagination
              count={count}
              // count={3}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </>
  );
}
