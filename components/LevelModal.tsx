import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalHeader,
  ModalOverlay, useColorModeValue
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form, Formik } from "formik";
import { useContext } from "react";
import AppContext from "../context/app-context";
import product from "../data/donation_products";
import customCheckoutRedirect from "../utils/stripe-checkout";
import { formatAmountForStripe } from "../utils/stripe-helpers";
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
        bg={useColorModeValue(["white", "white", "gray.100"], "gray.900")}
      >
        <Box maxWidth={"7xl"} mx="auto">
          <ModalHeader mt={2}>Do something good today</ModalHeader>
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

export interface FormValues {
  email: string,
  name: string,
  anonymous: boolean,
  product: string | undefined,
  tip:number,
}

export const Descriptions = () => {
  const app = useContext(AppContext);
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
  const totalSteps = steps.length;
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
          product: product()[0].id,
          tip: 5,
        }}
        onSubmit={(values) => {
          let selectedProduct = product().find((e) => e.id == values.product); // finding the right product
          if (selectedProduct == undefined)
            throw new Error("Product was not found");
          customCheckoutRedirect(
            {
              ...selectedProduct,
              price: formatAmountForStripe(
                (selectedProduct.price / 100) *
                  app.state.current_currency.value +
                  values.tip * app.state.current_currency.value,
                app.state.current_currency.code
              ),
              currency: app.state.current_currency.code,
            },
            20,
            app.state.current_currency.code
          );
          // TODO: Maybe add currency converted values in the form?
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Steps colorScheme="green" activeStep={activeStep} size={["md"]}>
            {steps.map(({ label, description, content }) => {
              const currentstep = content;
              return (
                <Step
                  label={label}
                  key={label}
                  h="full"
                  textAlign={"left"}
                  description={description}
                >
                  <Box h="full" mt={[0, 0, 16]}>
                    <Flex
                      align="center"
                      justify="center"
                      alignItems={"center"}
                      alignContent="center"
                      alignSelf={"center"}
                      h="full"
                    >
                      <Box bg="white" p={[2, 2, 6]} rounded="md">
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
                          {/**
                           * TODO: Needs to do form validation on next buttons and so fourth.
                           * Show error toast is anything wrong with the form.
                           */}
                          {activeStep + 1 === totalSteps ? (
                            <Button
                              colorScheme="green"
                              width="full"
                              type="submit"
                            >
                              Submit
                            </Button>
                          ) : (
                            <Button
                              colorScheme="green"
                              width="full"
                              onClick={() => nextStep()}
                            >
                              Next
                            </Button>
                          )}
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
