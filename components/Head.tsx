import { useColorModeValue } from '@chakra-ui/react'
import { default as NextHeader } from 'next/head'
import { share_image, share_subject, share_url } from '../data/social_links'
import OGHead from './OGHead'

type HeaderProps = {
    title: string
}
export default function Head({title}:HeaderProps){
const ogDescription = "Pakistan is facing adverse climate change where the lives of more than 33 million people have been affected. Many have lost their home, cattle, crops, farms and also lives. Shahul & Zeenat Foundation is helping provide meals, shelter and medical aid to the affected in Sukkur and the nearby districts."
return (    
    <NextHeader>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="theme-color" content={useColorModeValue("white","black")}></meta>
    <OGHead title={share_subject} description={ogDescription} image={share_image} url={share_url} />
    </NextHeader>)
}