import { TogglEntry } from './toggl-entry.interface'

export interface JiraIssue {
    id: String,
    statusCategory: string,
    summary: string,
    assignee: string,
    totalDuration: string,
    totalDurationMiliSeconds: number,
    aggregatedTags?: Array<any>,
    aggregateCategories?: Array<any>,
    estimatedDuration: string,
    estimatedDurationMillSeconds: number
    togglEntries?: Array<TogglEntry>
}