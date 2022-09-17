import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Flex,
    Heading,
    Box,
} from '@chakra-ui/react'
import CheckoutForm from './CheckoutForm'
import { Step, Steps, useSteps } from 'chakra-ui-steps';


export default function LevelModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent rounded={'none'}>
            <Box  maxWidth={'7xl'} mx="auto">
                <ModalHeader>Modal Title</ModalHeader>
                </Box>
                <ModalCloseButton />
                <ModalBody>
                    <Box  maxWidth={'7xl'} mx="auto">
                    <Descriptions />
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

} 


const steps = [
    { label: "Step 1", description: "Step 1 description" },
    { label: "Step 2", description: "Step 2 description" },
    { label: "Step 3", description: "Step 3 description" },
  ]
  
  const Content = ({index}:{index:number}) => {
    return  index;
  }
  export const Descriptions = () => {
    const { nextStep, prevStep, reset, activeStep } = useSteps({
      initialStep: 0,
    })
    return (
      <Flex flexDir="column" width="100%">
        <Steps colorScheme="telegram" activeStep={activeStep}>
          {steps.map(({ label, description }, index) => (
            <Step label={label} key={label} description={description}>
              <Content index={index} />
            </Step>
          ))}
        </Steps>
        {activeStep === steps.length ? (
          <Flex px={4} py={4} width="100%" flexDirection="column">
            <Heading fontSize="xl" textAlign="center">
              Woohoo! All steps completed!
            </Heading>
            <Button mx="auto" mt={6} size="sm" onClick={reset}>
              Reset
            </Button>
          </Flex>
        ) : (
          <Flex width="100%" justify="flex-end">
            <Button
              isDisabled={activeStep === 0}
              mr={4}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Flex>
        )}
      </Flex>
    )
  }
  
