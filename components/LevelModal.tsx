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
  useColorModeValue
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form, Formik } from "formik";
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
        bg={useColorModeValue("gray.100", "gray.900")}
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

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const Content = ({ index }: { index: number }) => {
  return index;
};
export const Descriptions = () => {
  const steps = [
    {
      label: "Lets initiate",
      description: "Lets initiate",
      content: <DonorForm />,
    },
    {
      label: "Choose givings",
      description: "Choose giving level",
      content: <ChooseLevel />,
    },
    {
      label: "Finalise good deeds",
      description: "Finalise good deeds",
      content: <GoodDeeds />,
    },
  ];
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" maxW="2xl" mx="auto" mt={6}>
      <Formik
        initialValues={{
          email: "",
          name: "",
          anonymous: false,
          product: "",
          tip: 5
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Steps colorScheme="gray" activeStep={activeStep}>
            {steps.map(({ label, description, content }) => {
              const currentstep = content;
              return (
                <Step
                  label={label}
                  key={label}
                  h="full"
                >
                  <Box h="full" my={16}>
                    <Flex
                      bg="gray.100"
                      align="center"
                      justify="center"
                      alignItems={"center"}
                      alignContent="center"
                      alignSelf={"center"}
                      h="full"
                    >
                      <Box bg="white" p={6} rounded="md">
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
                            onClick={nextStep}
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
