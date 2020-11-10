export default {
    duplicate(arr: any[]) {
        const tmp: any[] = [];
        arr.concat().sort().sort((a: any, b: any): any => {
            if (a === b && tmp.indexOf(a) === -1) tmp.push(a);
        });
        return tmp;
    }
}
