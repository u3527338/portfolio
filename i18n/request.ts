import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "zh"];

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale || "zh";

    if (!locales.includes(currentLocale as any)) notFound();

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}.json`)).default,
    };
});
