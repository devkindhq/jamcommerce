import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form, Formik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import AppContext from "../context/app-context";
import product, { default as products, Product } from "../data/donation_products";
import { convertCurrencyAmount } from "../utils/currency-helpers";
import customCheckoutRedirect from "../utils/stripe-checkout";
import {
  formatAmountForDisplay,
  formatAmountForStripe
} from "../utils/stripe-helpers";
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
          <ModalHeader
            mt={2}
            fontSize={useBreakpointValue({ base: "2xl", sm: "3xl", lg: "4xl" })}
          >
            Do something good today
          </ModalHeader>
        </Box>
        <ModalCloseButton />
        <ModalBody>
          <Box mx="auto">
            <Descriptions />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export interface FormValues {
  email: string;
  name: string;
  anonymous: boolean;
  product: string | undefined;
  tip: number;
  customProduct: Product | null
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
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = [
    yup.object().shape({
      name: yup
        .string()
        .nullable()
        .when("anonymous", {
          is: false,
          then: yup
            .string()
            .required("Name is required unless you're anonymous"),
        }),
      email: yup
        .string()
        .email("Please enter a valid email")
        .nullable()
        .when("anonymous", {
          is: false,
          then: yup
            .string()
            .required("Email address is required unless you're anonymous"),
        }),
      anonymous: yup.bool().required(),
    }),
    yup.object().shape({
      product: yup.string().required()
    }),
    yup.object().shape({
      tip: yup
        .number()
        .required()
        .positive()
        .integer()
        .max(100, "Please try 100 or less")
        .min(0, "No negative tips"),
    }),
  ];

  const submitForm = (values: FormValues) => {
    let selectedProduct = values?.customProduct ?? product().find((e) => e.id == values.product); // finding the right product
    if (selectedProduct == undefined) throw new Error("Product was not found");
    customCheckoutRedirect(
      {
        ...selectedProduct,
        price: formatAmountForStripe(
          (selectedProduct.price / 100) * app.state.current_currency.value + // product price
          (selectedProduct.price / 100 ) * (values.tip/100) * app.state.current_currency.value, // tip price
          app.state.current_currency.code
        ),
        currency: app.state.current_currency.code,
      },
      20,
      app.state.current_currency.code,
      values?.email ?? ""
    );
    // TODO: Maybe add currency converted values in the form?
  };
  const handleSubmit = (values: FormValues, actions: any) => {
    if (isLastStep) {
      submitForm(values);
    } else {
      actions.setTouched({}); // So that errors are gone.
      actions.setSubmitting(false);
      setStep(activeStep + 1);
    }
  };

  return (
    <Flex flexDir="column" maxW="4xl" mx="auto" mt={6}>
      <Formik
        initialValues={{
          email: "",
          name: "",
          anonymous: false,
          product: app.state.selectedProduct ?? product()[0].id,
          tip: 0,
          customProduct: null
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        validationSchema={currentValidationSchema[activeStep]}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const currentProduct = values.customProduct ?? products().find(
            (product) => product.id == values.product
          );
          return (
            <Form>
              <Steps
                colorScheme="green"
                activeStep={activeStep}
                size={["md"]}
                className="steps"
                labelOrientation="vertical"
              >
                {steps.map(({ label, description, content }) => {
                  return (
                    <Step
                      label={label}
                      key={label}
                      h="full"
                      textAlign={"left"}
                      description={description}
                      className="individualStep"
                    >
                      <Box h="full" mt={{ base: 0, lg: 8 }}>
                        <Flex
                          align="center"
                          justify="center"
                          alignItems={"center"}
                          alignContent="center"
                          alignSelf={"center"}
                          h="full"
                          w="full"
                        >
                          <Box
                            bg={useColorModeValue("white", "gray.800")}
                            p={[4, 4, 6]}
                            rounded="md"
                            w="full"
                          >
                            {/* <Box mb={4}>
                          {/* <Text fontSize="2xl" fontWeight={'500'}>{label}</Text>
                          <Text>{description}</Text> 
                          </Box> */}
                            {steps[activeStep].content}
                            {/**
                             * TODO: Needs to do form validation on next buttons and so fourth.
                             * Show error toast is anything wrong with the form.
                             */}

                            <HStack
                              mt={6}
                              justifyContent={"space-between"}
                              w="full"
                            >
                              {activeStep !== 0 && (
                                <Button
                                  colorScheme="gray"
                                  variant={"ghost"}
                                  isDisabled={activeStep === 0}
                                  width="full"
                                  onClick={prevStep}
                                >
                                  Previous
                                </Button>
                              )}

                              <Button
                                colorScheme="green"
                                width="full"
                                type="submit"
                              >
                                {isLastStep
                                  ? "Donate " +
                                    formatAmountForDisplay(
                                      convertCurrencyAmount(
                                        // @ts-ignore -- Because by this time the current product would have been found.
                                        (currentProduct?.price / 100 ) * (values.tip/100),
                                        app.state.base_currency,
                                        app.state.current_currency
                                      ) + 
                                        convertCurrencyAmount(
                                          // @ts-ignore -- Because by this time the current product would have been found.
                                          currentProduct?.price / 100,
                                          app.state.base_currency,
                                          app.state.current_currency
                                        ),
                                      app.state.current_currency.code
                                    )
                                  : "Next"}
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
          );
        }}
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
