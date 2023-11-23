import {useI18n} from "vue-i18n";

let translate = function translate(text: string, args?: any) {

    const {t, te} = useI18n();
    if (te(text)) {
        return t(text, args);
    } else {
        return text;
    }
}

export {
    translate
}
