import {IEvent} from "../models/event";


export function eventPaginateResponse(events: IEvent[]) {
    return {
        data: events
    }
}


export function eventResponse(events: IEvent) {
    return {
        data: events
    }
}