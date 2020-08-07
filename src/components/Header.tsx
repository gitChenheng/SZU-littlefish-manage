import React from "react";

export default class Header extends React.Component<any, any>{
    constructor(props: any) {
      super(props);
      this.state = {
        header_props: "生科小鱼儿",
      }
    }
    render() {
      return (
        <div>{this.state.header_props}</div>
      );
    }
}
