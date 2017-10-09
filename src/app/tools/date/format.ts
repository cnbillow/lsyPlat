export function formateDataForMaterial(str) {
    if (!str) return "";
    str = str.replace(/-/g, "/");
    let a = str.split("/");
    if (a[1].length == 1) {
        a[1] = "0" + a[1];
    }
    if (a[2].length == 1) {
        a[2] = "0" + a[2];
    }
    return a.join("-") + " 00:00:00";
}