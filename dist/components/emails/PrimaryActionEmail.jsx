export var EmailTemplate = function (_a) {
    var actionLabel = _a.actionLabel, buttonText = _a.buttonText, href = _a.href;
    var email = {
        preview: "The marketplace for high-quality digital contents.",
        body: [
            {
                type: 'img',
                src: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/hippo-newsletter-sign-up.png"),
                width: 150,
                height: 150,
                alt: 'Uperhaps',
                style: logo
            },
            {
                type: 'text',
                value: 'Hi there,',
                style: paragraph
            },
            {
                type: 'text',
                value: "Welcome to Uperhaps, your digital library for high quality literary contents. Use the button below to ".concat(actionLabel, "."),
                style: paragraph
            },
            {
                type: 'button',
                value: buttonText,
                href: href,
                style: button
            },
            {
                type: 'text',
                value: 'Best,\nThe Uperhaps team',
                style: paragraph
            },
            {
                type: 'hr',
                style: hr
            },
            {
                type: 'text',
                value: 'If you did not request this email, you can safely ignore it.',
                style: footer
            }
        ]
    };
    return email;
};
export var PrimaryActionEmailHtml = function (props) {
    var email = EmailTemplate(props);
    return "\n    <html>\n      <head>\n        <title>".concat(email.preview, "</title>\n      </head>\n      <body style=\"").concat(styleToString(main), "\">\n        <div style=\"").concat(styleToString(container), "\">\n          ").concat(email.body.map(renderElement).join(''), "\n        </div>\n      </body>\n    </html>\n  ");
};
var renderElement = function (element) {
    switch (element.type) {
        case 'img':
            return "<img src=\"".concat(element.src, "\" width=\"").concat(element.width, "\" height=\"").concat(element.height, "\" alt=\"").concat(element.alt, "\" style=\"").concat(styleToString(element.style), "\" />");
        case 'text':
            return "<p style=\"".concat(styleToString(element.style), "\">").concat(element.value, "</p>");
        case 'button':
            return "<div style=\"".concat(styleToString(btnContainer), "\"><a href=\"").concat(element.href, "\" style=\"").concat(styleToString(element.style), "\">").concat(element.value, "</a></div>");
        case 'hr':
            return "<hr style=\"".concat(styleToString(element.style), "\" />");
        default:
            return '';
    }
};
var styleToString = function (style) {
    return Object.entries(style).map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, ": ").concat(value);
    }).join('; ');
};
var main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
var container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};
var logo = {
    margin: '0 auto',
};
var paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};
var btnContainer = {
    textAlign: 'center',
};
var button = {
    padding: '12px 12px',
    backgroundColor: '#2563eb',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
};
var hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};
var footer = {
    color: '#8898aa',
    fontSize: '12px',
};
