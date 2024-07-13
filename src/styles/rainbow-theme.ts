import { merge } from "lodash"
import { darkTheme, Theme } from "@rainbow-me/rainbowkit"
import { colors } from "./tailwind-theme"

export const rainbowTheme = merge(
  darkTheme({
    accentColor: colors.mint,
    accentColorForeground: colors.charcoal,
    borderRadius: "small",
    overlayBlur: "small",
  }),
  {
    colors: {
      connectButtonBackground: "transparent",
      connectButtonText: colors.blue as string,
      modalBackground: colors.charcoal,
      modalText: colors.blue as string,
      profileForeground: colors.charcoal,
    },
  } as Theme
)
