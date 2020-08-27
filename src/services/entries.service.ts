/* Interfaces And Constants */
import { TOGGL_DOMAIN, TOGGL_ENTRIES, TOGGL_HEADER } from '../constants/constants';


/* Optional Import To Make Http Request For v1 API */
import * as rm from 'typed-rest-client/RestClient'


/* Function Used To Retrieve All The Toggl Entrie Of A Certain Workspace In An Specific Range */
export async function getTogglEntries( start:string = '2020-01-01', stop:string = '2020-12-31') : Promise<Array<any>> {

    let results: Array<any> = [];
    let togglRest: rm.RestClient = new rm.RestClient('jira-api', TOGGL_DOMAIN);

    let initialPage: number = 1;
    let response: rm.IRestResponse<any>;

    do {
        let query : string = `?workspace_id=4330393&since=${start}&until=${stop}&user_agent=api_test&page=${initialPage}`;
        response = await togglRest.get<any>( TOGGL_ENTRIES + query, { additionalHeaders: {'Authorization' : TOGGL_HEADER } } );
        
        if( response.statusCode === 200 ){
            initialPage++;
            results = results.concat(response.result.data);
        } else {
            let errorDetail = `HttpStatus: ${ response.statusCode }, Desc: An arror has ocurred retriving information from:  ${ TOGGL_ENTRIES }`;
            throw new Error(errorDetail);
        }
    } while( results.length < response.result.total_count );
    
    return results;
}
