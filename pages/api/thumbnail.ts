import type { NextApiRequest, NextApiResponse } from "next"
import playwright from "playwright-core"
import chromium from "chrome-aws-lambda"

const getAbsoluteURL = (path) => {
  const baseURL = process.env.NEXTAUTH_URL
  return baseURL + path
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath:
        (await chromium.executablePath) ||
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: chromium.headless,
    })

    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630,
      },
    })
    const url = getAbsoluteURL((req.query["path"] as string) || "")
    await page.goto(url, {
      timeout: 15 * 1000,
    })
    const data = await page.screenshot({
      type: "png",
    })
    await browser.close()
    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    res.setHeader("Content-Type", "image/png")
    res.end(data)
  } catch (err) {
    console.error(err)
  }
}

export default handler
