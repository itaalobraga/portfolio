import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const sfPro = localFont({
  src: [
    {
      path: "../../public/fonts/sf_pro_400.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/sf_pro_500.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/sf_pro_900.otf",
      weight: "900",
    },
  ],
  display: "swap",
  variable: "--font-sfpro",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-poppins",
});

export { poppins, sfPro };
