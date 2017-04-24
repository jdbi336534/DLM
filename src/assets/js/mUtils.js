// 格式化时间
export const formatTime = (t) => {
    let d = new Date();
    d.setTime(t);
    let Y = d.getFullYear();
    let M = d.getMonth() + 1;
    let D = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    M = M < 10 ? ('0' + M) : M;
    D = D < 10 ? ('0' + D) : D;
    h = h < 10 ? ('0' + h) : h;
    m = m < 10 ? ('0' + m) : m;
    s = s < 10 ? ('0' + s) : s;
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
}

// 获取用户id
export const getUserId = () => {
    let userId;
    try {
        userId = JSON.parse(sessionStorage.userInfo).id;
    } catch (e) {}
    return userId;
}

// 获取用户信息
export const getUserInfo = () => {
    let userId;
    try {
        userId = JSON.parse(sessionStorage.userInfo);
    } catch (e) {}
    return userId;
}

/**
 * 遍历所有对象，去掉首尾空格
 */
export const Objtrim = (obj) => {
    for (var p in obj) {
        if (typeof obj[p] === 'string') {
            obj[p] = obj[p].replace(/(^\s*)|(\s*$)/g, '');
        }
    }
    return obj;
}

/**
 * 将true或者false转换为1和0
 */
export const boolTonum = (a) => {
    if (a === true) {
        return 1;
    } else if (a === false) {
        return 0;
    } else {
        return a;
    }
}

/**
 * 遍历所有对象，将所有value数字类型数字转换为字符串类型
 */
export const ObjtoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].value === 'number') {
            arr[p].value = arr[p].value.toString();
        }
    }
    return arr;
}

/**
 * 遍历所有数组，将所有id数字类型数字转换为字符串类型
 */
export const ArrtoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].id === 'number') {
            arr[p].id = arr[p].id.toString();
        }
    }
    return arr;
}

/**
 * 将单选框值改变为需要的
 */
export const Checkbox = (a) => {
    if (a) {
        if (a === 1) {
            return '启用'
        } else if (a === 2) {
            return '禁用'
        }
    }
}

/**
 * 对级联选择判断，取数组最后一位
 */
export const Getcity = (a) => {
    if (a) {
        if (a.length > 0) {
            return a[a.length - 1];
        } else {
            return '';
        }
    } else {
        return '';
    }
}

/**
 * 将级联选择的最后一位解析为三维数字
 */
export const getCascad = (a) => {
    var arr = [];
    if (a !== null || a !== '') {
        arr[0] = parseInt(a / 10000) * 10000;
        arr[1] = parseInt(a / 100) * 100;
        arr[2] = a;
    }
    return arr;
}

/**
 * 将string类型的转换为number类型的
 */
export const myToNumber = (a) => {
    if (a !== null || a !== '') {
        return parseInt(a);
    } else {
        return '';
    }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
    if (!name) return;
    var obj = window.sessionStorage.getItem(name);
    try {
        return JSON.parse(obj);
    } catch (e) {
        return obj
    }
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    }
    /**
     * 将对象的key和value拼接成字符串
     */
export const keyPlusvalue = (obj) => {
    if (typeof obj !== 'object') return;
    let temparr = [];
    for (let key in obj) {
        temparr.push(`${key}:${obj[key]}`);
    }
    return temparr;
}
