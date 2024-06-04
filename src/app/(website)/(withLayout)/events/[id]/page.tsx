// import { Box, Typography } from "@mui/material";
// import Image from "next/image";
// import VerticalCard from "../../_components/cards/VerticalCard";
// import { useQuery } from "@tanstack/react-query";
// import { getEvent } from "@/app/(admin)/_actions/events";

// export default function eventDetails({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const eventQuery = useQuery({
//     queryKey: ["events", id],
//     queryFn: () => getEvent(id),
//   });

//   const event: Event = eventQuery.data?.data?.data?.event;
//   console.log("myEvent");
//   console;
//   return (
//     <>
//       <Box
//         component="div"
//         padding="20px"
//         sx={{
//           maxWidth: { xs: "390px", md: "900px" },
//           margin: "0 auto",
//         }}
//       >
//         <Box
//           component="div"
//           // padding="20px"
//           sx={{
//             // maxWidth: { xs: "390px", md: "900px" },
//             // margin: "0 auto",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: { xs: "column", md: "row" },
//           }}
//         >
//           <Box
//             component="div"
//             maxWidth="390px"
//             overflow="hidden"
//             borderRadius={{ xs: "12px", md: "12px 0 0 12px" }}
//             border="1px solid gray"
//             borderRight={{ xs: "1px solid gray", md: "0px" }}
//           >
//             <Image
//               src={"/services-1.svg"}
//               alt="exhibtion image"
//               height={300}
//               width={390}
//             />
//           </Box>
//           <Box
//             component="div"
//             maxWidth={350}
//             sx={{
//               margin: { xs: "0 auto", md: "initial" },
//               padding: "12px",
//               border: "1px solid gray",
//               borderLeft: { xs: "1px solid gray", md: "0" },
//               borderRadius: { xs: "12px", md: "0 12px 12px 0" },
//               height: "391px",
//             }}
//           >
//             <Typography
//               component="h3"
//               variant="body1"
//               marginBottom={".4rem"}
//               fontWeight={"bold"}
//             >
//               first
//             </Typography>
//             <Typography component="h3" variant="body1" marginBottom={".4rem"}>
//               GRIMM represents over thirty international artists with locations
//               in Amsterdam(NL),New York(US) and London(UK). Since its
//               establishment in 2005, it has been the gallery’s mission to
//               represent and support the work of emerging and mid-career artists
//             </Typography>
//             <Typography
//               component="p"
//               variant="body2"
//               // fontSize={".6rem"}
//               color={"#7469B6"}
//               textAlign="right"
//               // sx={{
//               //   display: "flex",
//               //   alignItems: "center",
//               //   marginBottom: "6px",
//               // }}
//             >
//               mohamed
//             </Typography>
//             <Box component="div">
//               <Typography
//                 component="p"
//                 variant="body2"
//                 // fontSize={".6rem"}
//                 color={"#7469B6"}
//               >
//                 From :{" "}
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   // fontSize={".6rem"}
//                   color={"black"}
//                 >
//                   12/05/2024
//                 </Typography>
//               </Typography>
//               <Box component="div" display={"flex"}>
//                 <Typography
//                   component="p"
//                   variant="body2"
//                   // fontSize={".6rem"}
//                   color={"#7469B6"}
//                 >
//                   To :{" "}
//                   <Typography
//                     component="span"
//                     variant="body2"
//                     // fontSize={".6rem"}
//                     color={"black"}
//                   >
//                     12/05/2024
//                   </Typography>
//                 </Typography>
//                 <Typography
//                   component="p"
//                   variant="body2"
//                   // fontSize={".6rem"}
//                   color={"#7469B6"}
//                   marginLeft="auto"
//                 >
//                   12 days
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//         <Box
//           component="section"
//           sx={{
//             padding: { xs: "20px 0", md: "20px" },
//             display: "grid",
//             // flexDirection: { xs: "column", md: "row" },
//             // alignItems: "center",
//             // justifyContent: "space-evenly",
//             // flexWrap: "wrap",
//             // gap: { xs: "1.6rem", md: "4rem" },
//             // margin: "0 auto",
//             gridTemplateColumns: {
//               xs: "1fr 1fr",
//               md: "1fr 1fr 1fr",
//               lg: "1fr 1fr 1fr",
//             },
//             placeItems: "center",
//             // marginTop: "20px",
//             gap: ".5rem",
//           }}
//         >
//           <VerticalCard imgUrl={""} title={""} name={""} category={""} />
//           <VerticalCard imgUrl={""} title={""} name={""} category={""} />
//           <VerticalCard imgUrl={""} title={""} name={""} category={""} />
//           <VerticalCard imgUrl={""} title={""} name={""} category={""} />
//         </Box>
//       </Box>
//     </>
//   );
// }

import EventComponent from "@/app/(website)/_components/eventComponent/EventComponent";
import Header from "../../../_components/header/Header";
import Footer from "../../../_components/footer/Footer";

export default function EventView() {
  return (
    <>
      {/* <Header /> */}
      <EventComponent />
      {/* <Footer /> */}
    </>
  );
}
