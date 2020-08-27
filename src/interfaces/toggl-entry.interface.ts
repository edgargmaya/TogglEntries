export interface TogglEntry {
    id: number,
    desc: string,
    start: string,
    stop: string,
    duration: string,
    durationMiliSeconds: number
    tags?: Array<string>,
    category: string;
}