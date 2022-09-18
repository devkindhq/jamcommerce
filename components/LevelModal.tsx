import {
  Box,
  Button,
  Flex, HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form, Formik } from "formik";
import product from "../data/donation_products";
import { ChooseLevel, DonorForm, GoodDeeds } from "./DonationSteps";

export default function LevelModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent
        rounded={"none"}
        bg={useColorModeValue(['white','white', "gray.100"], "gray.900")}
      >
        <Box maxWidth={"7xl"} mx="auto">
          <ModalHeader>Modal Title</ModalHeader>
        </Box>
        <ModalCloseButton />
        <ModalBody>
          <Box maxWidth={"7xl"} mx="auto">
            <Descriptions />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export const Descriptions = () => {
  const steps = [
    {
      label: "Lets initiate",
      description: "With a little something in your heart",
      content: <DonorForm />,
    },
    {
      label: "Choose givings",
      description: "Your donation goes long way.",
      content: <ChooseLevel />,
    },
    {
      label: "Finalise good deeds",
      description: "Hey, adding a little extra is kindness.",
      content: <GoodDeeds />,
    },
  ];
  const { nextStep, prevStep, reset, setStep, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" maxW="4xl" mx="auto" mt={6}>
      <Formik
        initialValues={{
          email: "",
          name: "",
          anonymous: false,
          product: product[0].id,
          tip: 5
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Steps colorScheme="green"  activeStep={activeStep} onClickStep={(step) => setStep(step)} size={['md']}>
            {steps.map(({ label, description, content }) => {
              const currentstep = content;
              return (
                <Step
                  label={label}
                  key={label}
                  h="full"
                  textAlign={'left'}
                  description={description}
                >
                  <Box h="full" mt={[0,0,16]}>
                    <Flex
                      align="center"
                      justify="center"
                      alignItems={"center"}
                      alignContent="center"
                      alignSelf={"center"}
                      h="full"
                    >
                      <Box bg="white" p={[2,2,6]} rounded="md">
                        {/* <Box mb={4}>
                        {/* <Text fontSize="2xl" fontWeight={'500'}>{label}</Text>
                        <Text>{description}</Text> 
                        </Box> */}
                        {currentstep}
                        <HStack
                          mt={6}
                          justifyContent={"space-between"}
                          w="full"
                        >
                          <Button
                            colorScheme="gray"
                            variant={"ghost"}
                            isDisabled={activeStep === 0}
                            size="sm"
                            width="full"
                            onClick={prevStep}
                          >
                            Previous
                          </Button>
                          <Button
                            colorScheme="green"
                            width="full"
                            onClick={() => setStep(activeStep+1)}
                          >
                            Next
                          </Button>
                        </HStack>
                      </Box>
                    </Flex>
                  </Box>
                </Step>
              );
            })}
          </Steps>
        </Form>
      </Formik>

      {/* {activeStep === steps.length ? (
          <Flex px={4} py={4} width="100%" flexDirection="column">
            <Heading fontSize="xl" textAlign="center">
              Woohoo! All steps completed!
            </Heading>
            <Button mx="auto" mt={6} size="sm" onClick={reset}>
              Reset
            </Button>
          </Flex>
        ) : (
          <Flex width="100%" justify="center">
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
        )} */}
    </Flex>
  );
};
