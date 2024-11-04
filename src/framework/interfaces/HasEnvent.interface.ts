import { Callback } from "./Event.interface";

export interface HasEvent {
  on(eventName: string, callback: Callback): void;
}
