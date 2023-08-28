import { OpenFeature, ProviderEvents } from "@openfeature/web-sdk"
import FlagsmithWebProvider from "./provider"

OpenFeature.setProvider(
  new FlagsmithWebProvider({
    environmentID: String(import.meta.env.VITE_FLAGSMITH_KEY || ""),
  })
)

const client = OpenFeature.getClient()

OpenFeature.addHandler(ProviderEvents.Ready, () => {
  console.log("Ready event")
  const v2Enabled = client.getBooleanValue("api-v2", true)
  const bannerResolution = client.getStringValue("banner", "200x200")

  document
    .getElementById("banner")
    ?.setAttribute("src", `https://placehold.co/${bannerResolution}`)

  const jsonAsValue = client.getObjectValue("impressive-feature-json", null)
  const codeBlock = document.getElementById("code")

  if (jsonAsValue && codeBlock)
    codeBlock.innerText = JSON.stringify(jsonAsValue, null, 2)

  console.log({ v2Enabled, bannerResolution, jsonAsValue })
})
