"use client"
import React,{useEffect,useState} from 'react';
import Picture from '../Picture/Picture';
import Display from '../Display/Display';
import MyImg from "../Picture/MyImg"
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEvent } from '@/app/(admin)/_actions/events';
import LandingLoader from '@/app/(website)/_components/landingLoader/landingLoader';


const imgResObj = {
    "total": 35609,
    "totalHits": 500,
    "hits": [
      {
        "id": 8595521,
        "pageURL": "https://pixabay.com/photos/forsythia-flowers-branch-8595521/",
        "type": "photo",
        "tags": "forsythia, flowers, branch",
        "previewURL": "https://cdn.pixabay.com/photo/2024/02/25/10/11/forsythia-8595521_150.jpg",
        "previewWidth": 112,
        "previewHeight": 150,
        "webformatURL": "https://pixabay.com/get/g24c4f90c4a3a84694a6c55e8cc7bf7a13553d67fc2b1bbc197554a9820d04a3010213fe6fbb27d5cca92f2ad168a92be08996e69ba7646c423e5df082f43c655_640.jpg",
        "webformatWidth": 480,
        "webformatHeight": 640,
        "largeImageURL": "https://pixabay.com/get/gb4e0ea5c2e34028041419a0bf6c6c4ec770d0608909eafe03f215e18b69b518224ceca06c08735db8296acddd405f7330f16131d627ea8b76f1fa518bf7a6b86_1280.jpg",
        "imageWidth": 3024,
        "imageHeight": 4032,
        "imageSize": 970371,
        "views": 79935,
        "downloads": 65664,
        "collections": 221,
        "likes": 1052,
        "comments": 45,
        "user_id": 10328767,
        "user": "Mylene2401",
        "userImageURL": "https://cdn.pixabay.com/user/2020/08/02/06-54-24-533_250x250.jpeg"
      },
      {
        "id": 3063284,
        "pageURL": "https://pixabay.com/photos/rose-flower-petal-floral-noble-3063284/",
        "type": "photo",
        "tags": "rose, flower, petal",
        "previewURL": "https://cdn.pixabay.com/photo/2018/01/05/16/24/rose-3063284_150.jpg",
        "previewWidth": 150,
        "previewHeight": 99,
        "webformatURL": "https://pixabay.com/get/g9dede9b82ad6cc6a36c871adf79ccbf28d79b81955204167d7f310e952cc683f01dc4bc9185fd8ef8498d891857c21de0784d899b756bb855fd099ed8486d9dc_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 426,
        "largeImageURL": "https://pixabay.com/get/g5c6233387395c9112a9d69af2873a19ca22dc4c07669e4fa1722d68587d2c031ae57f6b53505c46d9f6d40a925ba581fdd6247a9bb3265a9eadd39c3a28aa045_1280.jpg",
        "imageWidth": 6000,
        "imageHeight": 4000,
        "imageSize": 3574625,
        "views": 1197581,
        "downloads": 783906,
        "collections": 1622,
        "likes": 1749,
        "comments": 351,
        "user_id": 1564471,
        "user": "anncapictures",
        "userImageURL": "https://cdn.pixabay.com/user/2015/11/27/06-58-54-609_250x250.jpg"
      },
      {
        "id": 8515123,
        "pageURL": "https://pixabay.com/photos/bee-flower-yellow-apricot-apricot-8515123/",
        "type": "photo",
        "tags": "bee, flower, yellow apricot",
        "previewURL": "https://cdn.pixabay.com/photo/2024/01/17/17/22/bee-8515123_150.jpg",
        "previewWidth": 99,
        "previewHeight": 150,
        "webformatURL": "https://pixabay.com/get/g74ee6cea8e3a55a3b6695776d7d91befccc307c00b9440cc9436c0df447c3f2400e517e19e877f0dc7a7ca696380111a4f0715551e98b8b468d10406a20d4553_640.jpg",
        "webformatWidth": 424,
        "webformatHeight": 640,
        "largeImageURL": "https://pixabay.com/get/ge1e669b373228269084187f18e60ebc718d90f3655381b08a66e777e29fd33560019e415b9d2fff41b4652073e2d3d42fa53ff357554560cd7fb7b8eb5796e42_1280.jpg",
        "imageWidth": 3264,
        "imageHeight": 4928,
        "imageSize": 2799308,
        "views": 9410,
        "downloads": 6808,
        "collections": 30,
        "likes": 110,
        "comments": 19,
        "user_id": 23329472,
        "user": "achildinthewood",
        "userImageURL": ""
      },
      {
        "id": 8546570,
        "pageURL": "https://pixabay.com/photos/cosmos-yellow-flowers-flora-nature-8546570/",
        "type": "photo",
        "tags": "cosmos, flower wallpaper, flower background",
        "previewURL": "https://cdn.pixabay.com/photo/2024/02/01/18/53/cosmos-8546570_150.jpg",
        "previewWidth": 150,
        "previewHeight": 100,
        "webformatURL": "https://pixabay.com/get/gfaa209ae241a7b47954b76610760b7feb1a4c1cebbac80811c4889865964cf050f1a361288350d920fcdb680586ec57c71c462c36f715588bdb4c5919dfbf240_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 427,
        "largeImageURL": "https://pixabay.com/get/g42813ee1a57c7ec68af42917f0577bacf0b9295f92a2eca491dd7b702007432e6daae4a06b4d58e25643f6fc5096d803f93a77c23ef845d747368fd256a6514e_1280.jpg",
        "imageWidth": 7748,
        "imageHeight": 5165,
        "imageSize": 2496373,
        "views": 9468,
        "downloads": 8033,
        "collections": 38,
        "likes": 78,
        "comments": 15,
        "user_id": 21428489,
        "user": "ignartonosbg",
        "userImageURL": "https://cdn.pixabay.com/user/2024/01/14/15-44-01-243_250x250.jpg"
      },
      {
        "id": 8252992,
        "pageURL": "https://pixabay.com/photos/rose-yellow-rose-blossom-bloom-8252992/",
        "type": "photo",
        "tags": "rose, rose flower, yellow rose",
        "previewURL": "https://cdn.pixabay.com/photo/2023/09/14/13/22/rose-8252992_150.jpg",
        "previewWidth": 150,
        "previewHeight": 98,
        "webformatURL": "https://pixabay.com/get/g029cf906298e5bf5d94d053c492bff29f453be84b600d010aedded384125dc6c2a32311b6c12f74269546a4ca5125ef93a66b7109cf53a9af89941cbc57979f9_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 417,
        "largeImageURL": "https://pixabay.com/get/g26cf8e74607294cd89f5dd2e395fd391e4603fb8a2b9781f1a360a0f47f1d0bb94e343e9cacd549f5339bbbd554bbfeaa195a65f869e93bda36e09b985d1da29_1280.jpg",
        "imageWidth": 5778,
        "imageHeight": 3767,
        "imageSize": 3085154,
        "views": 16211,
        "downloads": 13387,
        "collections": 78,
        "likes": 136,
        "comments": 49,
        "user_id": 9820894,
        "user": "neelam279",
        "userImageURL": "https://cdn.pixabay.com/user/2023/01/17/14-53-00-230_250x250.jpg"
      },
      {
        "id": 2295434,
        "pageURL": "https://pixabay.com/photos/spring-bird-bird-tit-spring-blue-2295434/",
        "type": "photo",
        "tags": "spring bird, bird, tit",
        "previewURL": "https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295434_150.jpg",
        "previewWidth": 150,
        "previewHeight": 99,
        "webformatURL": "https://pixabay.com/get/g286bfc0f618e7402a948b0c7962ebebcfe22696c888fb23003c4636798d0e4a6c94d275ed172489e1144a64b839408d89191a8d64ac89313b50b656c9e7eba48_640.jpg",
        "webformatWidth": 640,
        "webformatHeight": 426,
        "largeImageURL": "https://pixabay.com/get/gdca5358d7591a96095917dcc094d43ebb92f8b50a4f048915ececcdeac210834fa16380753adb4349710d7eb6e39bb90201db1c88db990f43b926acf77a863d4_1280.jpg",
        "imageWidth": 5363,
        "imageHeight": 3575,
        "imageSize": 2938651,
        "views": 898042,
        "downloads": 547154,
        "collections": 2560,
        "likes": 2442,
        "comments": 306,
        "user_id": 334088,
        "user": "JillWellington",
        "userImageURL": "https://cdn.pixabay.com/user/2018/06/27/01-23-02-27_250x250.jpg"
      }
    ]
  }

  const positions = [[19.3, 7, 0],
  [34.7, 12, 12],
  [19.3, 7, 25],
  [-19.3, 7, 0],
  [-19.4, 7, 25],
  [-34.6, 10, 12]
]

const extraMetaData = [{
    url:"https://picsum.photos/200/300",
    scale:[4, 4, 0],
    position:[19.3, 7, 0],            
    rotation:[0, -Math.PI/2, 0],
    metalness:0.9,
    roughness:0.9,
}
    ,{  url:"https://picsum.photos/200/300",
            scale:[10, 10, 0],
            position:[34.7, 12, 12] ,           
            rotation:[0, -Math.PI / 2, 0],
            metalness:0,
            roughness:0.9}
        ,
    {
        url:"assets/3D/Wedding/scene.gltf",
        scale:[2.5, 2.5, 0],
        position:[19.3, 7, 25],            
        rotation:[0 , -Math.PI/2, 0],
        metalness:0.0,
        roughness:0.3,  
    },
{
    url:"assets/3D/Wilson/scene.gltf",
            scale:[2.5, 2.5, 0 ],
            position:[-19.3, 7, 0],            
            rotation:[0 , -Math.PI/2, 0],
            metalness:0,
            roughness:0.3, 
},{
    url:"assets/3D/OldMan/scene.gltf",
    scale:[4, 4, 0],
    position:[-19.4, 7, 25],            
    rotation:[0 , -Math.PI/2, 0],
    metalness:0.9,
    roughness:0.9,
},{
    url:"assets/3D/Girl/scene.gltf",
    scale:[6.5, 6.5, 0],
    position:[-34.6, 10, 12],            
    rotation:[0 , -Math.PI/2, 0],
    metalness:0.7,
    roughness:0.8,
}]

const displayProps = [{ position:[20, 5, 0], size:[1, 18, 11], id:1} ,
{position:[20, 5, 25], size:[1, 18, 11], id:2},
{position:[-20, 5, 0], size:[1, 18, 11], id:3},
{position:[-20, 5, 25], size:[1, 18, 11], id:4}

]

const Art = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const id = searchParams.get('e')
    console.log(id)
    console.log("idddddddd")
    const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events", id] });
  }, [pathname]);

  const eventQuery = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
  });
    const event = eventQuery.data?.data?.data;
  console.log("myEvent");
  console.log(event);

   const { isLoading } = eventQuery;

//    if (isLoading) {
//     return <LandingLoader />;
//   }

//   if (!event) {
//     return <div>event not found!</div>;
//   }


      if(isLoading || !event){
        return <>
             <Picture 
            url={"assets/3D/Portrait/scene.gltf"}
            scale={[4, 4, 4]}
            position={[19.3, 7, 0]}            
            rotation={[0, -Math.PI, 0]}
            metalness={0.9}
            roughness={0.9}
        />
        { displayProps.map(disProp =><Display position={disProp.position} size={disProp.size} /> )
    }
        </>
    }
    
   const modifiedImgList = event?.products &&
   event?.products.map((product,i) => ({
    ...product,
    ...extraMetaData[i],
    url:product.coverImage
   }))
   return(
   [ modifiedImgList.map(imgParams => <MyImg 
        url={imgParams.url}
        scale={imgParams.scale}
        position={imgParams.position}            
        rotation={imgParams.rotation}
        metalness={imgParams.metalness}
        roughness={imgParams.roughness}
        key={imgParams.id}
    />  ),
    displayProps.map(disProp =><Display position={disProp.position} size={disProp.size} key={disProp.id} /> )
    ]
   )


//------------------------------------------///
//     const [imgRes, setImageRes] = useState({})

//     useEffect(() => {
//         const fetchImg = async () => {
//             // const res =  await axios.get("https://pixabay.com/api/?key=43588509-cce640375a7ae66ab5f3cd40d&q=yellow+flowers&image_type=photo&page=1&per_page=6");
//             const res =  await axios.get(`https://pixabay.com/api/?key=43588509-cce640375a7ae66ab5f3cd40d&q=yellow+flowers&image_type=photo&page=1&per_page=6`);

//             // const res = {}
//             console.log(res?.data);
//             if(res?.data&&res?.data?.hits){
//                 setImageRes(res.data)
//             }
//         }

//         fetchImg();
        
//     },[])

//     if(!imgRes?.hits){
//         return <>
//              <Picture 
//             url={"assets/3D/Portrait/scene.gltf"}
//             scale={[4, 4, 4]}
//             position={[19.3, 7, 0]}            
//             rotation={[0, -Math.PI, 0]}
//             metalness={0.9}
//             roughness={0.9}
//         />
//         { displayProps.map(disProp =><Display position={disProp.position} size={disProp.size} /> )
//     }
//         </>
//     }

//    const modifiedImgList = imgRes.hits.map((img,i) => ({
//     ...img,
//     ...extraMetaData[i],
//     url:img.largeImageURL
//    }))
//    return(
//    [ modifiedImgList.map(imgParams => <MyImg 
//         url={imgParams.url}
//         scale={imgParams.scale}
//         position={imgParams.position}            
//         rotation={imgParams.rotation}
//         metalness={imgParams.metalness}
//         roughness={imgParams.roughness}
//         key={imgParams.id}
//     />  ),
//     displayProps.map(disProp =><Display position={disProp.position} size={disProp.size} key={disProp.id} /> )
//     ]
//    )

//----------------------------------------///

//     return (
//         <>
//         {/* liam portrait */}
//         {/* <Picture 
//             url={"assets/3D/Portrait/scene.gltf"}
//             scale={[4, 4, 4]}
//             position={[19.3, 7, 0]}            
//             rotation={[0, -Math.PI, 0]}
//             metalness={0.9}
//             roughness={0.9}
//         /> */}
//         <Display position={[20, 5, 0]} size={[1, 18, 11]} />
           
//         {/* creation of adam */}
//         {/* <Picture 
//             url={"assets/3D/Hands/scene.gltf"}
//             scale={[0.1, 0.1, 0.1]}
//             position={[34.7, 12, 12]}            
//             rotation={[0, -Math.PI / 2, Math.PI]}
//             metalness={0}
//             roughness={0.9}
//         /> */}

// <MyImg 
//             url={"https://picsum.photos/200/300"}
//             scale={[10, 10, 0]}
//             position={[34.7, 12, 12]}            
//             rotation={[0, -Math.PI / 2, 0]}
//             metalness={0}
//             roughness={0.9}
//         />

//         {/* wedding */}
//         <Picture 
//             url={"assets/3D/Wedding/scene.gltf"}
//             scale={[2.5, 2.5, 2.5]}
//             position={[19.3, 7, 25]}            
//             rotation={[Math.PI / 2, Math.PI, 0]}
//             metalness={0.0}
//             roughness={0.3}
//         />
//          <Display position={[20, 5, 25]} size={[1, 18, 11]} />

//         {/* wilson portrait */}
//          <Picture 
//             url={"assets/3D/Wilson/scene.gltf"}
//             scale={[2.5, 2.5, 2.5 ]}
//             position={[-19.3, 7, 0]}            
//             rotation={[-Math.PI / 2, 0, 0]}
//             metalness={0}
//             roughness={0.3}
//         />
//          <Display position={[-20, 5, 0]} size={[1, 18, 11]} />

//         {/* old man portrait */}
//         <Picture 
//             url={"assets/3D/OldMan/scene.gltf"}
//             scale={[4, 4, 4]}
//             position={[-19.4, 7, 25]}            
//             rotation={[0, 0, 0]}
//             metalness={0.9}
//             roughness={0.9}
//         />
//          <Display position={[-20, 5, 25]} size={[1, 18, 11]} />

//          {/* girl portrait */}
//          <Picture 
//             url={"assets/3D/Girl/scene.gltf"}
//             scale={[6.5, 6.5, 6.5]}
//             position={[-34.6, 10, 12]}            
//             rotation={[-Math.PI / 2, 0, 0]}
//             metalness={0.7}
//             roughness={0.8}
//         />
         
//     </>

//     )
  }

  export default Art;