
export function formModelClear(model) {
    let _data = {};
    for (let i of Object.keys(model)) {
        if (model[i] != null && model[i] !== '') {
            _data[i] = model[i];
        }
    }
    return _data;
}

export function extend(a, b) {
    for (let item of Object.keys(b)) {
        a[item] = b[item];
    }
    return a;
}