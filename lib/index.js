"use strict";

import base64_url_decode from "./base64_url_decode";

export function InvalidTokenError(message) {
    this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = "InvalidTokenError";

export default function(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified");
    }

    options = options || {};
    const pos = options.header === true ? 0 : 1;
    let base64decoded;
    try {
        base64decoded = base64_url_decode(token.split(".")[pos]);
    } catch (e) {
        throw new InvalidTokenError("Invalid token specified: " + e.message);
    }

    const maybeParseFloat = (x) => parseFloat(x) || x;

    try {
        return JSON.parse(base64decoded);
    } catch (e) {
        return maybeParseFloat(base64decoded);
    }
}
