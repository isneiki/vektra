import { chromium as playwright } from "playwright-core";
import chromium from "@sparticuz/chromium";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" }),
    );
  }

  const body = await readBody<{
    html: string;
  }>(event);

  if (!body?.html) {
    throw createError({
      statusCode: 400,
      statusMessage: "HTML is required",
    });
  }

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(body.html, {
      waitUntil: "networkidle",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    setHeader(event, "Content-Type", "application/pdf");
    setHeader(
      event,
      "Content-Disposition",
      'attachment; filename="document.pdf"',
    );

    return pdfBuffer;
  } finally {
    await browser.close();
  }
});
