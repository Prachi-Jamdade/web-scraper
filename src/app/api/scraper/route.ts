import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { config } from 'dotenv';
config(); 

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function POST() {
  try {
    
    await chromium.font(
      "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
    );

    const isLocal = !!process.env.NEXT_PUBLIC_CHROME_EXECUTABLE_PATH;
    console.log("ENV: ", isLocal);

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.NEXT_PUBLIC_CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto("https://example.com");
    const pageTitle = await page.title();
    console.log("Page Title: ", pageTitle); 

    await browser.close();

  } catch (e) {
    console.error("Error in POST handler:", e);
    return new Response(
      JSON.stringify({ success: false, error: e }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
