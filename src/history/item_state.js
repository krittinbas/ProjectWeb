import "./item_state.css";
import { Component, useState } from "react";

import LISTSTATE from "../liststate/liststate";
import { url_myAPI } from "../config";
export default class ITEM_STATE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeKey: props.keyData["codeKey"],
            nickname: props.keyData["nickname"],
            qu: 10,
            histo: {}
        };
    }
    componentDidMount() {
        this.getState();
        this.interval = setInterval(() => {
            this.getState();
        }, 30000);
    }
    getState = () => {
        const { codeKey, qu } = this.state;
        fetch(`${url_myAPI}history?codeKey=${codeKey}&row=${qu}`)
            .then(rell => rell.json())
            .then(data => {
                if (data.status) {
                    this.setState({ histo: data.data })
                }
            })
            .catch()
    }
    componentWillUnmount() {
        clearInterval(this.interval); // ต้องทำการล้าง Interval เมื่อ component ถูก unmount เพื่อป้องกันการทำงานของ Interval ที่ไม่จำเป็น
    }
    render() {
        const { codeKey, nickname, qu, histo } = this.state;
        return (
            <div className="item-state-main-contrainer">
                <div className="title">
                    <div className="mixs">
                        <div className="namebar">{nickname}</div>
                        <div className="off">on</div>
                    </div>
                    <div className="state">
                        จำนวนเปิดปิด :  {this.props.keyData["statekey"].countuse}
                    </div>
                    <div>
                        <input type="number" defaultValue={qu} min="10" max="50" onChange={(e) => { this.setState({ qu: e.target.value }) }} />
                        <input type="submit" onClick={() => this.getState()} />
                    </div>
                </div>
                <div className="colordss">
                    {/* {histo.map((item, index) => (
                        <LISTSTATE index={index} time={item.time} date={item.date} report={item.report} />
                    ))} */}
                </div>
            </div>
        );
    }
}
