/* Utilities */
import { Util } from '../utilities/util.utilities';


/* Custom Interfaces */
import { FinalResponse } from '../interfaces/final-response.interface';
import { JiraIssue } from '../interfaces/jira-issue.interface';
import { TogglEntry } from '../interfaces/toggl-entry.interface';


/* Function Used To Join The Jira Issues and The Toggl Entries */
export async function retrieveIssues( issues:any, entries:any, projectId:string ) : Promise<FinalResponse> {

    let response: FinalResponse = {
        projectID: projectId,
        jiraIssues: []
    }

    issues.forEach( (issue:any) => {
        
        let togglEntries: Array<TogglEntry> = [];
        let totalDur = 0;

        for(let i = entries.length - 1; i >= 0 ; i-- ){
            
            if( entries[i].description.includes(issue.key) || Util.analize( entries[i].description, issue.key) ){
                
                let entry = entries[i];
                entries.splice(i, 1);
                
                togglEntries.push({
                    id: entry.id,
                    desc: entry.description,
                    start: entry.start.split('T')[1].split('-')[0],
                    stop: entry.end.split('T')[1].split('-')[0],
                    duration: Util.secondsToTime(entry.dur/1000),
                    durationMiliSeconds: entry.dur,
                    tags: entry.tags,
                    category: entry.tags[0] !== '' && entry.tags[0] !== undefined ? Util.getCategory(entry.tags[0]) : '',
                });
                totalDur += entry.dur;
            }

        }

        let tmp: JiraIssue = {
            id: issue.key,
            statusCategory: issue.fields.status.statusCategory.name,
            summary: issue.fields.summary,
            assignee: issue.fields.assignee ? issue.fields.assignee.displayName : '',
            totalDuration: Util.secondsToTime(totalDur/1000),
            totalDurationMiliSeconds: totalDur,
            estimatedDuration: issue.fields.timetracking.originalEstimate,
            estimatedDurationMillSeconds: issue.fields.timetracking.originalEstimateSeconds * 1000
        };

        tmp.togglEntries = togglEntries;
        response.jiraIssues.push(tmp);

    });

    return response;
}