import { EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaFacebookMessenger, FaLinkedin, FaSms, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { EmailShareButton, FacebookMessengerShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";

const share_url = "https://shahulzeenat.org"
const share_body = "Pakistan's%20Sindh%20Province%20has%20been%20the%20hardest%20hit%20with%20almost%2015%20million%20people%20homeless%20and%20half%20of%20the%20province%20underwater.%20We%20request%20everyone%20to%20join%20hands.%0A%0AVisit%20the%20URL%20below%20%F0%9F%91%87%20to%20make%20your%20donations%20%0Ahttps%3A%2F%2Fshahulzeenat.org"
const share_subject = "Help a flood affected family today!"
export const social_links = [

  {
    outlet: "Facebook",
    href:
      "https://www.facebook.com/sharer.php?u=",
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook",
    icon: <FacebookShareButton url={share_url} style={{padding:'9px'}} className="facebook_button"><FaFacebook /></FacebookShareButton>,
    colorScheme: 'facebook'
  },
  {
    outlet: "Facebook Messenger",
    href:
      "https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook Messenger",
    icon: <FacebookMessengerShareButton appId="0" url={share_url} style={{padding:'9px'}}><FaFacebookMessenger /></FacebookMessengerShareButton>,
    colorScheme: 'messenger'
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
      "https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React",
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
    icon: <EmailShareButton subject={share_subject} body={share_body} url={share_url} style={{padding:'9px'}}><EmailIcon /></EmailShareButton>
  },
  {
    outlet: "SMS",
    href:
      `sms:?body=${share_body}`,
    background: "#7bcb20",
    color: "white",
    type: 'button',
    label: "Share via SMS",
    icon: <FaSms />
  }
]