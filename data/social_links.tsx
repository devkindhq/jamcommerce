import { EmailIcon } from "@chakra-ui/icons";
import { FaFacebook, FaFacebookMessenger, FaLinkedin, FaSms, FaTelegram, FaWhatsapp } from "react-icons/fa";

export const social_links = [

  {
    outlet: "Facebook",
    href:
      "https://www.facebook.com/sharer.php?u=",
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook",
    icon: <FaFacebook />,
    colorScheme: 'facebook'
  },
  {
    outlet: "Facebook Messenger",
    href:
      "https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
    background: "#3b5898",
    color: "white",
    label: "Share on Facebook Messenger",
    icon: <FaFacebookMessenger />,
    colorScheme: 'messenger'
  },
  {
    outlet: "Whatsapp",
    href:
      "whatsapp://send?text=",
    background: "#3b5898",
    color: "white",
    label: "Share on Whatsapp",
    icon: <FaWhatsapp />,
    colorScheme:'whatsapp'
  },
  
  {
    outlet: "Telegram",
    href:
      "https://telegram.me/share/url?=",
    background: "#00aced",
    color: "white",
    label: "Share on Telegram",
    icon: <FaTelegram />,
    colorScheme: 'telegram'
  },
  {
    outlet: "LinkedIn",
    href:
      "https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React",
    background: "#0a66c2",
    color: "white",
    label: "Share on Linkedin",
    icon: <FaLinkedin />,
    colorScheme: 'linkedin'
  },
  {
    outlet: "Email",
    href:
      "mailto:?subject=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!",
    background: "#dd4b39",
    color: "white",
    label: "Share via Email",
    icon: <EmailIcon />
  },
  {
    outlet: "SMS",
    href:
      "sms:?body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
    background: "#7bcb20",
    color: "white",
    label: "Share via SMS",
    icon: <FaSms />
  }
]