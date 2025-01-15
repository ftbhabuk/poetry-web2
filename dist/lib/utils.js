var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
export function constructMetadata(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.title, title = _c === void 0 ? 'Uperhaps - Your Digital Library' : _c, _d = _b.description, description = _d === void 0 ? 'Unleash your creativity and immerse yourself in the world of poetry and literature with UnwhisperedPerhaps... Sign up today and start your literary journey with us!' : _d, _e = _b.image, image = _e === void 0 ? '/thumbnail.jpg' : _e, _f = _b.icons, icons = _f === void 0 ? '/favicon.ico' : _f, _g = _b.noIndex, noIndex = _g === void 0 ? false : _g, _h = _b.type, type = _h === void 0 ? 'website' : _h, _j = _b.siteName, siteName = _j === void 0 ? 'Uperhaps' : _j, _k = _b.locale, locale = _k === void 0 ? 'en_US' : _k, _l = _b.url, url = _l === void 0 ? 'https://uperhaps.up.railway.app' : _l;
    return __assign({ title: title, description: description, openGraph: {
            title: title,
            description: description,
            type: type,
            siteName: siteName,
            locale: locale,
            url: url,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        }, twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [image],
            creator: '@Bhabuk',
        }, other: {
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:site_name': siteName,
            'og:locale': locale,
            'og:url': url,
            'theme-color': '#ffffff', // Adjust this to match your site's theme color
        }, icons: icons, metadataBase: new URL(url), alternates: {
            canonical: url,
        } }, (noIndex && {
        robots: {
            index: false,
            follow: false,
        },
    }));
}
export function getStructuredData(data) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: [{
                '@type': 'Person',
                name: data.authorName,
            }],
    };
}
