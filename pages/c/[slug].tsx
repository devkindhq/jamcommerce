import { Box, Container, Divider, Text, useColorModeValue } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { createClient } from '@supabase/supabase-js'
import CampaignHero from '../../components/CampaignHero'
import MarketingLayout from '../../components/MarketingLayout'

type Campaign = {
  id: number
  slug: string
  title: string
  description: string
  goal_amount: number
  currency: string
  end_date: string | null
  status: string
  banner_url: string | null
}

type Props = {
  campaign: Campaign
}

export default function CampaignPage({ campaign }: Props) {
  const mutedText = useColorModeValue('gray.600', 'gray.400')
  const divider = useColorModeValue('gray.100', 'gray.700')

  return (
    <MarketingLayout
      title={`${campaign.title} — JamCommerce`}
      description={campaign.description?.substring(0, 160) || `Support ${campaign.title} on JamCommerce.`}
    >
      <Container maxW="5xl" pb={16}>
        <CampaignHero campaign={campaign} />

        {campaign.description && (
          <>
            <Divider borderColor={divider} my={8} />
            <Box maxW="2xl" mx="auto">
              <Text color={mutedText} lineHeight="tall" whiteSpace="pre-wrap">
                {campaign.description}
              </Text>
            </Box>
          </>
        )}
      </Container>
    </MarketingLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params ?? {}

  if (!slug || typeof slug !== 'string') {
    return { notFound: true }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Supabase not configured — return a placeholder for development
    return {
      props: {
        campaign: {
          id: 0,
          slug,
          title: 'Campaign preview (Supabase not configured)',
          description: 'Configure your Supabase environment variables to see real campaigns.',
          goal_amount: 10000,
          currency: 'AUD',
          end_date: null,
          status: 'active',
          banner_url: null,
        },
      },
    }
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return { notFound: true }
  }

  return {
    props: { campaign: data },
  }
}
