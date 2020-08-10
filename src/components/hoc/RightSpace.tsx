import React, {Fragment, Component, PureComponent} from "react";
import NavBar from "@/components/NavBar";

export default function RightSpace (Wrapped: any): any {
    return class extends Component<any, any> {
        private navBarWidth: number = 200;
        state = {
            spaceWidth: "auto",
        }
        componentDidMount() {
            this.setState({spaceWidth: document.documentElement.offsetWidth - this.navBarWidth})
        }
        render() {
            return <Fragment>
                <div className="content">
                    <NavBar navBarWidth={this.navBarWidth}/>
                    <div style={{maxWidth: this.state.spaceWidth}}>
                        <Wrapped
                            {...this.props}
                        />
                    </div>
                </div>
            </Fragment>
        }
    }
}
