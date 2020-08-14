export default function Es5Promise(this: any, func: any) {
    const _this = this;
    _this.status = "pending";
    _this.successList = [];
    _this.failList = [];
    _this.value = "";
    _this.reason = "";
    function resolve(r: any) {
        if (_this.status === "pending"){
            _this.status = "resolved";
            _this.value = r;
            const args = Array.prototype.slice.call(arguments); //同this.value
            _this.successList.forEach((item: any) => {
                item.apply(null, args);
                _this.successList.unshift();
            })
        }
    }
    function reject(e: any) {
        if (_this.status === "pending"){
            _this.status = "rejected";
            _this.reason = e;
            const args = Array.prototype.slice.call(arguments);
            _this.failList.forEach((item: any) => {
                item.apply(null, args);
                _this.failList.unshift();
            })
        }
    }
    func(resolve, reject)
}
Es5Promise.prototype.then = function (success: any, fail: any) {
    this.successList.push(success)
    this.failList.push(fail)
    return this
}
