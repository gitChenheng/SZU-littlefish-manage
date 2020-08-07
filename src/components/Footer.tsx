import React from "react";

export default class Footer extends React.Component<any, any>{
    // loadData(id: any){
    //     return new Promise((resolve => {
    //         setTimeout(() => {
    //             resolve(id)
    //         }, 2000)
    //     })).then(data => {
    //         this.setState({data})
    //     });
    // }
    // static getDerivedStateFromProps(nextProps: any, prevState: any){
    //     console.log('getDerivedStateFromProps',nextProps, prevState);
    //     if (nextProps.id !== prevState.id){
    //         return {id: nextProps.id, data: "new Data update"}
    //     }
    //     return null;
    // }
    render() {
        console.log(this.props)
        return (
            <div>
                {"copy right"}
            </div>
        );
    }
}
