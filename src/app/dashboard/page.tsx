
"use client"
import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div className="flex gap-4 flex-wrap ">
            
     
            <Skeleton className="w-1/4 h-40">

                <div>contents wrapped</div>
                <div>contents wrapped</div>
                <div>contents wrapped</div>

            </Skeleton>
            <Skeleton className="w-64 h-40">

                <div>contents wrapped</div>
                <div>contents wrapped</div>
                <div>contents wrapped</div>

            </Skeleton>
            <Skeleton className="w-60 h-40">

                <div>contents wrapped</div>
                <div>contents wrapped</div>
                <div>contents wrapped</div>

            </Skeleton>
            <Skeleton className="w-60 h-40">

                <div>contents wrapped</div>
                <div>contents wrapped</div>
                <div>contents wrapped</div>

            </Skeleton>
            
            <Box padding='6' boxShadow='lg' bg='white' className="w-full">
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white' className="w-full">
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white' className="w-full">
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white' className="w-full">
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>

        </div>

    )
}