export const DOCKLEFT = "dockLeft";
export const DOCKRIGHT = "dockRight";
export const HIDETASKPANE = "hideTaskPane";
export const ADDSTRING = "addString";
export const GETDOCNAME = "getDocName";
export const SETDEMOSPAN = "setDemoSpan";
export const OPENWEB = "openWeb";


export function dockLeft(data: any) {
    return { type: DOCKLEFT, data }
}

export function dockRight(data: any) {
    return { type: DOCKRIGHT, data }
}

export function hideTaskPane(data: any) {
    return { type: HIDETASKPANE, data }
}

export function addString(data: any) {
    return { type: ADDSTRING, data }
}

export function getDocName(data: any) {
    return { type: GETDOCNAME, data }
}

export function setDemoSpan(data: any) {
    return { type: SETDEMOSPAN, data }
}

export function openWeb(data: any) {
    return { type: OPENWEB, data }
}