"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
const Header = () => {
  const [show , setShow] =useState(false)

 return <Box component={"div"} sx={{height:"73px",width:"100%"}}>
 <Stack component="nav" direction="row" sx={{alignItems:"center" , padding:"12px", backgroundColor:"#FFFFFF", position:"fixed", width:"100%"}} >
    <Image alt='Logo' src='/logo.png' width={75} height={75} />
    <MenuIcon sx={{display:{md:"none",xs:"initial"}, margin:"0 auto"}} fontSize='large' onClick={() => setShow(prevState => !prevState)} />
    <Stack component="ul" direction={{md:"row",xs:"column"}}spacing={{lg:8,xs:2}} sx={{margin:"0 auto", position:{xs:"absolute",md:"initial"},left:0,top:"73px" ,width:{xs:"100%",md:"auto"}, alignItems:{xs:"center",md:"initial"} }} display={{md:"flex",xs:show?"flex":"none"}} >
        <Box component="li" >
        <Link href={''}>
        <Typography component="p" variant="h6" sx={{"&:hover":{
            color:"blue"
        }}}>
        About
        </Typography>
        
        </Link>
        </Box>
        <Box component="li">
        <Link href={''}>
        <Typography component="p" variant="h6" sx={{"&:hover":{
            color:"blue"
        }}}>
        Artists
        </Typography>
        
        </Link>
        </Box>
        <Box component="li">
        <Link href={''}>
        <Typography component="p" variant="h6" sx={{"&:hover":{
            color:"blue"
        }}}>
        Collections
        </Typography>
        </Link>
        </Box>
        <Box component="li">
        <Link href={''}>
        <Typography component="p" variant="h6" sx={{"&:hover":{
            color:"blue"
        }}}>
        Events
        </Typography>
        </Link>
        </Box>
    </Stack>
    {/* <Box component="div"  sx={{marginLeft:{xs:"auto",md:"0"}}}> */}
    <Button className='w-fit' >
        Login
    </Button>
    {/* </Box> */}
 </Stack>
 </Box>
}

export default Header