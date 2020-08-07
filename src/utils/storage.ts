export const setCookie = (name: string, value: any, outTime?: number) => {
    try {
        let str = name + '=' + encodeURIComponent(value); // 编码以适合任何浏览器
        if (outTime) {
            const mm = outTime * 24 * 3600 * 1000;
            const date = new Date();
            date.setTime(date.getTime() + mm);
            str += ';expires=' + date.toUTCString();
        }
        document.cookie = str;
    } catch (a) {
        console.log(a);
    }
};

export const getCookie = (name: string) => {
    let value = null;
    if (name != null) {
        const v = new RegExp("(?:^|; )" + name + "=([^;]*)")
            .exec(document.cookie);
        value = v ? decodeURIComponent(v[1]) : null;
    }
    return value;
};

export const removeCookie = (name: string) => {
    setCookie(name, "")
};

export const setSessionStore = (key: string, value: any) => {
    if (window.sessionStorage) {
        try {
            window.sessionStorage.setItem(key, value);
        } catch (e) {
            setCookie(key, value);
        }
    } else {
        setCookie(key, value);
    }
};

export const getSessionStore = (key: string) => {
    let value = null;
    if (window.sessionStorage) {
        try {
            value = window.sessionStorage.getItem(key);
            if (!value) {
                value = getCookie(key);
            }
        } catch (e) {
            value = getCookie(key);
        }
    } else {
        value = getCookie(key);
    }
    return value;
};

export const clearSessionStore = (key: string) => {
    if (window.sessionStorage) {
        try {
            window.sessionStorage.removeItem(key);
        } catch (e) {
            setCookie(key, "", -1);
        }
    } else {
        setCookie(key, "", -1);
    }
};

export const setLocalStore = (key: string, value: any) => {
    if (window.localStorage) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            setCookie(key, value);
        }
    } else {
        setCookie(key, value);
    }
};

export const getLocalStore = (key: string) => {
    let value = null;
    if (window.localStorage) {
        try {
            value = window.localStorage.getItem(key);
            if (value == null) {
                value = getCookie(key);
            }
        } catch (e) {
            value = getCookie(key);
        }
    } else {
        value = getCookie(key);
    }
    return value;
};

export const clearLocalStore = (key: string) => {
    if (window.localStorage) {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            setCookie(key, "", -1);
        }
    } else {
        setCookie(key, "", -1);
    }
};
