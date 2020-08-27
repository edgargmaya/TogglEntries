/* Express Request and Response */
import { Request, Response } from 'express'


/* Custom Interfaces */
import { Project } from '../interfaces/project.interface';


/* Services */
import { getJiraProjects, getJiraProjectDetails } from '../services/projects.service';
import { getTogglEntries } from '../services/entries.service';
import { retrieveIssues } from '../services/issues.service';


/* Main Controller */
export async function getIssues(req: Request, res: Response): Promise<Response | void> {
    try {
        let togglEntries: Array<any> = await getTogglEntries();

        let project: Project = (await getJiraProjects()).find( (elem:Project) => elem.id === req.params.projectId );
        if( project == undefined )
            return res.status(404).json({
                "message" : `The project with id: ${req.params.projectId}, doesn't exists. Please, try again`
            });

        let jiraIssues: Array<any> = await getJiraProjectDetails(project);
        
        return res.json(await retrieveIssues(jiraIssues, togglEntries, req.params.projectId));
    } catch( err ){
        console.error( err );
        return res.status(500).json({
            "message" : `Something went wrong. Please, try again`,
            "details" : `${err}`
        });
    }
}
