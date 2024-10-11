import React from 'react';
import { Box, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

const NoActivitiesMessage = () => {


    return (
        <>
            <div>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="start"
                    height="100vh"

                    p={4}
                    borderRadius="md"
                >
                    <Heading as="h2" size="lg" mb={4} color="red.500">
                        Não há atividades disponíveis.
                    </Heading>
                <Text fontSize="lg" mb={6} textAlign="center" color="green.700" >
                        Parece que você ainda não possui atividades relacionadas.                     
                </Text>
                <Text fontSize="lg" mb={6} textAlign="center" color="green.700" fontWeight="bold">Entre em contato com um adminstrador!</Text>
                <FiAlertCircle className='text-2xl'/>
                </Box>
            </div>

        </>
    );
};

export default NoActivitiesMessage;
