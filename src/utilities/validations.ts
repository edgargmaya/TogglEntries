import { Util } from '../utilities/util.utilities';

export class HttpBadRequestError extends Error {

    public status: number;

    constructor(status:number, message?:string){
        super(message);
        this.status = status;
    }
}

export function validateQueryParams( queryParams:any ){

    let error: HttpBadRequestError = new HttpBadRequestError(400);
    let caching = ( queryParams.caching == 'true')

    if( caching && (queryParams.start || queryParams.stop) ){
        error.message = "Caching option is not available with start and stop parameters";
        throw error;
    }

    if( queryParams.start ? !Util.validateDate(queryParams.start) : false ){
        error.message = "Start is not a valid date, try with this format: YYYY-MM-DD";
        throw error;
    }

    if( queryParams.stop ? !Util.validateDate(queryParams.stop) : false ){
        error.message = "Stop is not a valid date, try with this format: YYYY-MM-DD";
        throw error;
    }

}