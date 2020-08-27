/* Express Request and Response */
import { Request, Response } from 'express'


/* Utilities */
import { Util } from '../utilities/util.utilities';


/* Custom Interfaces */
import { Project } from '../interfaces/project.interface';
import { getEntriesFromMySql, updateCaching } from '../services/caching.service';


/* Second Controller */
import { getJiraProjects, getJiraProjectDetails } from '../services/projects.service';
import { getTogglEntries } from '../services/entries.service';
import { retrieveIssues } from '../services/issues.service';


/* API v2 */
import { validateQueryParams } from '../utilities/validations';


/* API v2 */
export async function getIssuesV2(req: Request, res: Response): Promise<Response | void> {
    
    try {

        validateQueryParams( req.query );
        let caching = ( req.query.caching == 'true');
        
        let project: Project = (await getJiraProjects()).find( (elem:Project) => elem.id === req.params.projectId || elem.key === req.params.projectId );
        if( project == undefined )
            return res.status(404).json({
                "message" : `The project with id: ${req.params.projectId}, doesn't exists. Please, try again`
            });

        let togglEntries: Array<any> = caching ? await getEntriesFromMySql(project.name) : await getTogglEntries(req.query.start?.toString(), req.query.stop?.toString());
        if( togglEntries.length == 0 && caching ){
            togglEntries = await updateCaching();
        }

        let jiraIssues: Array<any> = await getJiraProjectDetails(project);
        
        return res.json(await retrieveIssues(jiraIssues, togglEntries, project.id));
    } catch( err ) {
        console.error( err );
        if( err.status )
            return res.status( err.status ).json({
                "message" : `Something went wrong. Please, try again`,
                "details" : `${err.message}`
            });
        else
            return res.status(500).json({
                "message" : `Something went wrong. Please, try again`,
                "details" : `${err}`
            });
    }
}


export async function updateCache(req: Request, res: Response): Promise<Response | void> {
    try {
        await updateCaching();
        return res.json({
            message : "The cache was updated"
        });
    } catch( err ){
        console.error( err );
        return res.status(500).json({
            "message" : `Something went wrong. Please, try again`,
            "details" : `${err}`
        });
    }
}