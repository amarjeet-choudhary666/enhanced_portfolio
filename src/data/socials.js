import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";

/**
 * Only real profiles. `primary` decides navbar vs footer placement, so the two
 * cannot drift apart the way they had (navbar showed Instagram, the hero showed
 * Twitter, and the contact section listed a Dribbble account that doesn't exist).
 */
export const socials = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/amarjeet-choudhary666",
    Icon: FiGithub,
    primary: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amarjeet-choudhary-238399248/",
    Icon: FiLinkedin,
    primary: true,
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/Amarjee78508156",
    Icon: FiTwitter,
    primary: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/amarjeetchoudhary_2003",
    Icon: FiInstagram,
    primary: false,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:amarjeetchoudhary647@gmail.com",
    Icon: FiMail,
    primary: true,
  },
];
