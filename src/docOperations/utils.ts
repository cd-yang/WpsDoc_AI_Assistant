export function removeWordUnicodeSuffix(text: string) {
    // eslint-disable-next-line no-control-regex
    return text.replace(/\r\u0007/g, '').replace(/\r/g, '')
}