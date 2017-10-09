import { Validators, FormControl, FormGroup } from '@angular/forms';
export const TEST = {
    mobileValidator(mobile: FormControl): any {
        if (!mobile.value) return null;
        let value = mobile.value;
        let reg = /^1[345678]\d{9}$/;
        let valid = reg.test(value);
        return valid ? null : { mobile: true };
    }, emailCodeControl(email: FormControl): any {
        if (!email.value) return null;
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value) ? null : { email: true };
    }, qqControl(qq: FormControl): any {
        if (!qq.value) return null;
        return /^\d{5,15}$/.test(qq.value) ? null : { qq: true }
    }, passwordValidator(info: FormGroup): any {
        let password = info.get('passwordControl') as FormControl;
        let passwordConfirm = info.get('passwordConfirmControl') as FormControl;
        if (!password.value && !passwordConfirm.value) return null;
        let valid: boolean = password.value === passwordConfirm.value;
        return valid ? null : { _password: true }
    }, passwordIject(password: FormControl): any {
        if (!password.value) return null;
        return /\D\d|\d\D/.test(password.value) && password.value.length >= 6 && password.value.length <= 30 ? null : { password: true }
    }, imgCode(code: string): any {
        return (control: FormGroup): any => {
            return code.toLocaleLowerCase() == control.value.toLocaleLowerCase() ? null : { code: true }
        }
    }, postCode(pcode: FormControl): any {
        if (!pcode.value) return null;
        return String(pcode.value).length == 6 ? null : { pcode: true }
    }, content(txt: FormControl): any {
        if (!txt.value) return null;
        return /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(txt.value) ? null : { pcode: true }
    }, accoutCode(code: FormControl): any {
        if (!code.value) return null;
        return /^\d{16,19}$/.test(code.value) ? null : { code: true }
    }
}