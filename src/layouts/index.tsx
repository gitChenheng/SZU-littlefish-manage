import React, {Component, Fragment, useState, useEffect} from "react";
import {connect} from "umi";
import {Spin} from "antd";

class Layout extends Component<any, any>{
    render() {
        return <Fragment>
            {this.props.common.loading ? <div className="loading flex-center">
                    <Spin size={"large"}/>
            </div> : null}
            {this.props.children}
        </Fragment>;
    }
}

export default connect(
    common => ({...common})
)(Layout)
