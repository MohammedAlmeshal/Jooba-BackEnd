import { extendTheme } from "@chakra-ui/react";
import { mode, transparentize } from "@chakra-ui/theme-tools";

const direction = document.documentElement.lang === "ar" ? "rtl" : "ltr";

const theme = extendTheme({
  direction,


  colors: {
    brand: {
      100: "#00C2FF",
      600: "#00C2FF",
      200: "#C328AB",
      300: "#C328AB",
      400: "#2490B2",
    },
  },

  components: {
    tabs: {
      variants: {
        line: (props) => ({
          tablist: {
            borderColor: props.colorMode === "dark" ? "brand.200" : "brand.100",
          },
          tab: {
            _selected: {
              color: props.colorMode === "dark" ? "brand.200" : "brand.100",
              borderColor: "currentColor",
            },
            _active: {
              bg: props.colorMode === "dark" ? "brand.200" : "brand.100",
            },
          },
        }),
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "base",
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        outline: (props) => ({
          //  colorScheme: props.colorMode === "dark" ? "brand.200" : "brand.100",
          border: "2px solid",
          borderColor: props.colorMode === "dark" ? "brand.200" : "brand.100",
          _active: {
            bg: props.colorMode === "dark" ? "brand.200" : "brand.100",
            color: "white",
          },
        }),
      },
    },
  },
});

export default theme;
