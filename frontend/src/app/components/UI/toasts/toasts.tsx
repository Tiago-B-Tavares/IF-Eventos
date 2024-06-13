import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'


interface toastProps{
    title: string;
    description: string;
    status: 'success' | 'error' | 'warning';
    duration: number,
    isClosable: boolean,
}

function Toast(toastProps: toastProps) {
    const toast = useToast()

    const {title, description, status, duration, isClosable} = toastProps

    return (
      
            toast({
                title: title,
                description: description,
                status: status,
                duration: duration,
                isClosable: isClosable,
            })
        )
}