// src/utils/getScreenshot.ts
export function getScreenshotURL(websiteUrl: string) {
    const base = "https://shot.screenshotapi.net/screenshot";
    const token = import.meta.env.VITE_SCREENSHOT_API_KEY;

    const params = new URLSearchParams({
        token,
        url: websiteUrl,
        output: "image",
        file_type: "png",
        viewport: "1440x1024",
        full_page: "true",
    });

    return `${base}?${params.toString()}`;
}