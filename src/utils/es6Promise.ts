export default class Es6Promise {
    status = "pending";
    successList: any = [];
    failList: any = [];
    constructor(fun?: any) {
        console.log(this.resolve)
        fun(this.resolve, this.reject.bind(this));
    }

    resolve(r: any){
        console.log("this",this)
        status = "resolved";
        this.successList.forEach((item: any) => {
            item(r);
            this.successList.unshift();
        })
    }

    reject(e: any){
        status = "rejected";
        this.failList.forEach((item: any) => {
            item(e);
            this.failList.unshift();
        })
    }

    then(success: never, fail?: any){
        this.successList.push(success);
        this.failList.push(fail);
        return this;
    }

}

