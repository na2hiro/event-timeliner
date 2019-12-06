import { FunctionComponent, useState, useMemo } from "react";
import * as React from "react";
import "../../node_modules/vis-timeline/dist/vis-timeline-graph2d.min.css"
import { parseEvent, IEvent } from "../models/Event";
import Timeline from "./Timeline";
import useHashBackedStringState from "../hooks/useHashBackedStringState";

const Main: FunctionComponent = () => {
    const [text, setText] = useHashBackedStringState("");
    const events = text.split("\n").map(parseEvent).filter(event => event);
    console.log(events);
    return <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <h1 style={{margin: 0}}>Event Timeliner</h1>
        <Timeline events={events} />
        <textarea value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Exception @ 8pm&#13;&#10;People complain @ 9pm" style={{
                fontSize: "20px",
                width: "100%",
                height: "100%",
                fontFamily: "'Courier New', Courier, monospace"
            }}
        />
    </div>;
};
export default Main;