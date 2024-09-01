import {IEvent} from "../models/event";


export function eventPaginateResponse(events: IEvent[]) {
    return {
        data: events
    }
}


export function eventResponse(event: IEvent) {
    return {
        data: event
    }
}