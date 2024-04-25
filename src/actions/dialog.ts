export const GETDOCNAME = "getDocName";
export const CREATETASKPANE = "createTaskpane";
export const NEWDOC = "newDoc";
export const ADDSTRING = "addString";
export const CLOSEDOC = "closeDoc";
export const SETDEMOSPAN = "setDemoSpan";
export const OPENWEB = "openWeb";

export function getDocName(data: any) {
    return { type: GETDOCNAME, data }
}

export function createTaskpane(data: any) {
    return { type: CREATETASKPANE, data }
}

export function newDoc(data: any) {
    return { type: NEWDOC, data }
}

export function addString(data: any) {
    return { type: ADDSTRING, data }
}

export function closeDoc(data: any) {
    return { type: CLOSEDOC, data }
}

export function setDemoSpan(data: any) {
    return { type: SETDEMOSPAN, data }
}

export function openWeb(data: any) {
    return { type: OPENWEB, data }
}