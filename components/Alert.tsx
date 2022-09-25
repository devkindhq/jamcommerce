import {
    Alert, AlertDescription, AlertIcon, Box, CloseButton, Slide, useDisclosure
} from "@chakra-ui/react";


function CustomAlert({title, description, status}: {title: string, description: string, status: "info" | "warning" | "success" | "error"}) {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return (<Box position={'relative'} zIndex={1}>
    <Slide direction='top' in={isVisible}>
    <Alert status={status} mx="auto" alignContent={'center'} alignItems='self-start' justifyContent={'center'}>
      <AlertIcon />
      <Box>
        <AlertDescription><strong style={{marginRight: '10px'}}>{title}</strong>{description}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
    </Slide>
    </Box>
  )
}

export default CustomAlert;