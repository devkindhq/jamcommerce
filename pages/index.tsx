import {
  Box,
  Button,
  Collapse,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useState } from "react";
import CampaignCard from "../components/CampaignCard";
import CheckoutForm from "../components/CheckoutForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import ShareCard from "../components/ShareCard";
import description from "../data/donation_description";

type Homepage = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
};

const IndexPage = ({ source }: Homepage) => {
  const Content = () => {
    return (
      <Box>
        <CampaignCard
          {...{
            index: 2,
            title: "Campaign Objective",
            content:
              "Pakistan's Sindh Province has been the hardest hit with almost 15 million people homeless and half of the province underwater. We request everyone to join hands",
          }}
        />
        {useBreakpointValue({
          base: (
            <>
              <Collapse startingHeight={300} in={show}>
                <Prose>
                  <MDXRemote {...source} />
                </Prose>
              </Collapse>
              <Button
                size="md"
                variant="outline"
                w="full"
                mt={8}
                onClick={handleToggle}
              >
                Read {show ? "Less" : "More"}
              </Button>
            </>
          ),
          md: (
            <Prose>
              <MDXRemote {...source} />
            </Prose>
          ),
        })}
      </Box>
    );
  };
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => setShow(!show);
  const isMobile = useBreakpointValue({base: true, md: false })
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Box maxW={"7xl"} mx="auto" px={4}>
        <Hero />
        <Flex flexDirection={["column", "column", "row"]} gap={12} my={12}>
          <Box w={["auto", "auto", "70%"]}>
            <Stack>
            <Content />
            {!isMobile && (<ShareCard />)}
            </Stack>
          </Box>
          <Box w={["auto", "auto", "30%"]}>
            <Stack gap={6}>
            <CheckoutForm />
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default IndexPage;

export async function getStaticProps() {
  /** TODO: Read the query parameter for ?status=cancelled and display some information to inform user that transaction was cancelled */
  // MDX text - can be from a local file, database, anywhere

  const mdxSource = await serialize(description);
  return { props: { source: mdxSource } };
}
