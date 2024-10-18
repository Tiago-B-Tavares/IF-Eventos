import React from 'react';
import { Box, Heading, Text, Image, Button, Icon } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';
import alert from '../../../images/alerta.png'


const alerta = (alert as unknown as { src: string }).src;
const NoActivitiesMessage = () => {


    return (
        <>
            <div className='bg-white'>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="start"
                    height="100vh"

                    p={4}
                    borderRadius="md"
                >

                    <Image className="w-40  " src={alerta} alt="" />


                    <Heading as="h1" size="2xl" mb={4} color="red.300">
                        Oops!
                    </Heading>
                    <Heading as="h2" size="lg" mb={4} color="red.300">
                        Parece que você ainda não possui atividades para gerenciar
                    </Heading>

                    <Text fontSize="lg" mb={6} textAlign="center" color="green.700" fontWeight="bold">Entre em contato com um adminstrador!</Text>

                </Box>
            </div>

        </>
    );
};

export default NoActivitiesMessage;
