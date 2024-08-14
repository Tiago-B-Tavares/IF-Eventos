
"use client"

import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";


export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mt-2">
           
            <Card align='center' className="bg-slate-100 max-w-full mx-2">
                <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <p>View a summary of all your customers over the last month.</p>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue'>View here</Button>
                </CardFooter>
            </Card>

            <Card align='center' className="bg-slate-100 max-w-full mx-2">
                <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <p>View a summary of all your customers over the last month.</p>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue'>View here</Button>
                </CardFooter>
            </Card>
            <Card align='center' className="bg-slate-100 max-w-full">
                <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <p>View a summary of all your customers over the last month.</p>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue'>View here</Button>
                </CardFooter>
            </Card>
        </div>

    )
}