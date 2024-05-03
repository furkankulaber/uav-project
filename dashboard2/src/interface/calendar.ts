import type { Except } from 'type-fest'

interface CalendarEvent {
  id: string
  url: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extendedProps: Record<string, any>
}

interface Event extends CalendarEvent {
  extendedProps: {
    calendar?: string
    location: string
    description: string
    guests: string[]
  }
}

type NewEvent = Except<Event, 'id'>

export type { Event, NewEvent }
