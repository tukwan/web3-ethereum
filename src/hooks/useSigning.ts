import { useSigner } from "@usedapp/core"

export const useSigning = () => {
  const signer = useSigner()

  const sign = async (message: string) => {
    if (!signer) throw new Error("Signer is not available")

    try {
      const signature = await signer.signMessage(message)
      console.log("Message signed:", { message, signature })
      return signature
    } catch (error) {
      console.error("Message signing failed:", error)
      throw error
    }
  }

  return { sign }
}
