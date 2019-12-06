import React, { FunctionComponent, useState, useEffect } from "react";
import { DataSet, Timeline as VisTimeline } from "vis-timeline";
import { IEvent } from "../models/Event";

type Props = {
    events: IEvent[];
}

const Timeline: FunctionComponent<Props> = ({ events }) => {
    const items = new DataSet(events.map((event, i) => ({
        id: i,
        content: event.text,
        start: event.moment,
    })))
    let [timeline, setTimeline] = useState(null);
    const ref = React.useRef()
    useEffect(() => {
        if (!timeline) {
            timeline = new VisTimeline(ref.current, items, {})
            setTimeline(timeline);
        } else {
            timeline.setItems(items);
        }
        timeline.redraw();
    })

    return <div ref={ref} />;
};

export default Timeline;