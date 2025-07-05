export function removeWordUnicodeSuffix(text) {
    // eslint-disable-next-line no-control-regex
    return text.replace(/\r\u0007/g, '').replace(/\r/g, '')
}