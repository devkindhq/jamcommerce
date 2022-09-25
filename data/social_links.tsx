import { EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";
import banner from "../public/banner.png";

export const share_url = "https://shahulzeenat.org"
export const share_body = "I request you to donate to help the ones affected by the flood. \n\n As you are aware, Pakistan is facing adverse climate change where the lives of more than 33 million people have been affected. Many have lost their home, cattle, crops, farms and also lives. Shahul & Zeenat Foundation is helping provide meals, shelter and medical aid to the affected in Sukkur and the nearby districts. \n \n Visit the link to donate. Each donation small or big is valuable.\n\n Find the link below  👇👇\n\n"
export const share_subject = "Help a flood affected family today!"
export const share_image = banner.src
const email_subject = "I request you to help the people of Pakistan";
export const social_links = [

  {
    outlet: "Facebook",
    href:
      "https://www.facebook.com/sharer.php?u=",
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook",
    icon: <FacebookShareButton url={share_url} style={{padding:'9px'}} className="facebook_button" quote="Test asdas" hashtag="#pakistanfloodrelief"><FaFacebook /></FacebookShareButton>,
    colorScheme: 'facebook'
  },
  {
    outlet: "Whatsapp",
    href:
      "whatsapp://send?text=",
    background: "#3b5898",
    color: "white",
    label: "Share on Whatsapp",
    icon: <WhatsappShareButton url={share_url} style={{padding:'9px'}}><FaWhatsapp /></WhatsappShareButton>,
    colorScheme:'whatsapp'
  },
  
  {
    outlet: "Telegram",
    href:
      "https://telegram.me/share/url?=",
    background: "#00aced",
    color: "white",
    label: "Share on Telegram",
    icon: <TelegramShareButton url={share_url} title={share_subject} style={{padding:'9px'}}><FaTelegram /></TelegramShareButton>,
    colorScheme: 'telegram'
  },
  {
    outlet: "LinkedIn",
    href:
      `https://www.linkedin.com/shareArticle?url=${share_url}`,
    background: "#0a66c2",
    color: "white",
    label: "Share on Linkedin",
    icon: <LinkedinShareButton title={share_subject} summary={share_body} url={share_url} style={{padding:'9px'}}><FaLinkedin /></LinkedinShareButton>,
    colorScheme: 'linkedin'
  },
  {
    outlet: "Email",
    background: "#dd4b39",
    color: "white",
    label: "Share via Email",
    icon: <EmailShareButton subject={email_subject} body={share_body} url={share_url} style={{padding:'9px'}}><EmailIcon /></EmailShareButton>
  }
]