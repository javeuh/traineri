import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";

import axios from "axios";

import "../../main.scss";

const Calendar = () => {
    const url = "https://customerrest.herokuapp.com/gettrainings";
    const [trainings, setTrainings] = useState([]);

    const fetchData = () => {
        axios.get(url).then(res => {
            setTrainings(res.data);
        });
    };

    function CalendarEvent(title, start, duration, customer) {
        this.title = title;
        this.start = moment(start).toDate();
        this.duration = duration;
        this.customer = customer;
        this.end = moment(start)
            .add(this.duration, "m")
            .toDate();
    }

    const events = trainings.map(event => {
        return new CalendarEvent(
            event.activity,
            event.date,
            event.duration,
            event.customer
        );
    });

    useEffect(() => fetchData(), []);
    return (
        <FullCalendar
            events={events}
            header={{
                center: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin]}
            views={{
                dayGridMonth: {
                    // name of view
                    weekNumbers: true
                    // other view-specific options here
                },
                timeGridWeek: {
                    allDaySlot: true,
                    slotDuration: "0:30:00"
                },
                timeGridDay: {
                    allDaySlot: true,
                    slotDuration: "0:30:00"
                }
            }}
            eventClick={function(info) {
                const el = info.event._def.extendedProps;
                alert(
                    "Customer: " +
                        el.customer.firstname +
                        " " +
                        el.customer.lastname +
                        " / Activity: " +
                        info.event.title +
                        " " +
                        el.duration +
                        "min"
                );
                // change the border color just for fun
            }}
        />
    );
};

export default Calendar;
