import { JiraIssue } from './jira-issue.interface';

export interface FinalResponse {
    projectID: number | string,
    jiraIssues: Array<JiraIssue>
}