/* Interfaces And Constants */
import { Project } from '../interfaces/project.interface';
import { JIRA_DOMAIN, JIRA_HEADER, PROJECTS, PROJECT_DETAILS } from '../constants/constants';


/* Utilities */
import { Util } from '../utilities/util.utilities';


/* Optional Import To Make Http Request For v1 API */
import * as rm from 'typed-rest-client/RestClient'


const jiraRest: rm.RestClient = new rm.RestClient('jira-api', JIRA_DOMAIN );


/* Function Used To Retrieve All The Projects From A Certain Workspace */
export async function getJiraProjects() : Promise<Array<Project>|any> {
    let response: rm.IRestResponse<any> = await jiraRest.get<any>( PROJECTS, { additionalHeaders: {'Authorization' : JIRA_HEADER } } );
    if( response.statusCode === 200 )
        return mappingProjects( response.result );

    let errorDetail = `HttpStatus: ${ response.statusCode }, Desc: An arror has ocurred retriving information from:  ${ PROJECTS }`;
    throw new Error(errorDetail);
}


/* Function Used To Retrieve All The Jira Issues Of A Certain Project */
export async function getJiraProjectDetails( project:Project ): Promise<Array<any>|any> {
    let response: rm.IRestResponse<any> = await jiraRest.create<any>( PROJECT_DETAILS, Util.getQuery( project.name ), { additionalHeaders: {'Authorization' : JIRA_HEADER }});
    if( response.statusCode === 200 )
        return response.result.issues;
    
    let errorDetail = `HttpStatus: ${ response.statusCode }, Desc: An arror has ocurred retriving information from:  ${ PROJECT_DETAILS }`;
    throw new Error(errorDetail);

}


/* Function Used To Map The Response */
function mappingProjects( schema: any ): Array<Project> {
    let projects: Array<Project> = [];
    schema.projects.forEach( (element:Project) => {
        let { id, key, name } = element;
        projects.push({
            id,
            key,
            name
        })
    });
    return projects;
}