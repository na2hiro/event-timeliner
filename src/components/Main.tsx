import { FunctionComponent, useState, useMemo } from "react";
import * as React from "react";
import visTimeline, { DataSet, Timeline } from "vis-timeline";
import "../../node_modules/vis-timeline/dist/vis-timeline-graph2d.min.css"
import { parseEvent, IEvent } from "../models/Event";
import moment from "moment";

const Main: FunctionComponent = () => {
    const [text, setText] = useState("");
    const [events, setEvents] = useState<IEvent[]>([]);
    const event = parseEvent(text);
    return <div onSubmit={(e) => {
        e.preventDefault();
        if (!event) return;
        const newEvents = events.slice();
        newEvents.push(event);
        setEvents(newEvents);
        setText("");
    }}>
        <form>
            <label style={{ fontSize: "40px" }}>
                Add event: <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                    placeholder="Exception @ 8pm" style={{ fontSize: "40px" }}
                />
            </label>
            {event && event.text + " " + event.moment.format()}
        </form>
        <NeverRerenderTimeline events={events} />
    </div>;
};
export default Main;

type Props = {
    events: IEvent[];
}
const NeverRerenderTimeline: FunctionComponent<Props> = ({ events }) => {
    const items = new DataSet(events.map((event, i) => ({
        id: i,
        content: event.text,
        start: event.moment,
    })))
    let [timeline, setTimeline] = useState(null);
    const ref = React.useRef()
    React.useEffect(() => {
        if (!timeline) {
            timeline = new Timeline(ref.current, items, {})
            setTimeline(timeline);
        } else {
            timeline.setItems(items);
        }
        timeline.redraw();
    })

    return <div ref={ref} />;
};