import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig)
const colors = fullConfig.theme.colors

export { colors }
