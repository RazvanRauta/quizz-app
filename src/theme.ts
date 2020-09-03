import theme from "@chakra-ui/theme";
import { merge } from "@chakra-ui/utils";
import BGImage from "./assets/images/bg.jpg";

const customTheme = {
  styles: {
    global: {
      body: {
        backgroundImage: `url(${BGImage})`,
        backgroundSize: "cover",
        margin: 0,
      },
    },
  },
};

export default merge(theme, customTheme);
