/* Utilityt Class */
export class Util {


    /* A Very Simple Utilityt Function To Check If A Category Contains An Specific Tag */
    public static getCategory( tag:string ) : string {
        let setOMEGA = {
            name: 'OMEGA',
            values: 'qa_automation,planning,design,estimation,coordination_work,process,training,pm_admin,accounting,payroll,invoices,compliance,admin,onboarding,off_boarding,evaluation,recruiting,interviewing'
        };
        let setALPHA = {
            name: 'ALPHA',
            values: 'refactoring,bug_fix,test_automation,testing,implementation,refining,code_review,deployment,tech_research,qa_updates,qa_testing'
        };
        let setBETA = {
            name: 'BETA',
            values: '_non_billable,_video_review,_pair_working,_meeting'
        };
        if( setOMEGA.values.includes( tag ) ){
            return setOMEGA.name;
        }
        if( setBETA.values.includes( tag ) ){
            return setBETA.name;
        }
        if( setALPHA.values.includes( tag ) ){
            return setALPHA.name;
        }
        return '';
    }


    /* A Very Simple Utilityt Function That Backs A Predefined Query */
    public static getQuery( project : string ) : any {
        let query = {
            expand: [
                "names",
                "schema",
                "operations"
            ],
            jql: "",
            maxResults: 15,
            fields: [
                "summary",
                "status",
                "assignee",
                "timetracking"
            ],
            startAt: 0
        }
        let preparedQuery = Object.assign({},query);
        preparedQuery.jql = `project = '${project}'`;
        return preparedQuery;
    }


    /* A Very Simple Utilityt Function To Check There Are A Posible Ocurrnece */
    static analize( description:string, key:string ) :any {
        
        const vectorPresission : number = 2;
        const margenPresission : number = 8;

        let tmpKey = key.substring(0, vectorPresission);
        let index = 0;
        
        while( ( index = description.indexOf(tmpKey, index) ) !== -1 ){
            let word = description.substring(index, index + margenPresission ).replace(/[\W ]/g, '');
            if( word.includes( key.replace(/[\W ]/g, '') ) ){
                return true;
            }
            index++;
        }

        return false;
    }


    /* A Very Simple Utilityt Function To Convert Seconds To HH:mm:ss Format */
    static secondsToTime(seconds:number) : string {
        let hours, min, sec;
        
        hours = Math.floor(seconds / 3600);
        min = Math.floor( ( seconds - (hours * 3600) ) / 60 );
        sec = seconds - (hours * 3600) - ( min * 60 );
        
        hours = hours < 10 ? '0' + hours : hours;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        
        return `${hours}:${min}:${sec}`;
    }


    /* Validate Date */
    static validateDate(date:string) : boolean {
        
        /* Convert Every String To YYYY-MM-dd Format */
        let dateTmp = date.replace(/[\W]/g, '-');
        let tokens = dateTmp.split('-');

        if( tokens.length !== 3 || tokens[0].length !== 4 || tokens[1].length !== 2 || tokens[2].length !== 2 )
            return false;
        
        if( tokens[0][0] == '0' || parseInt(tokens[1]) > 12 || parseInt(tokens[2]) > 31 )
            return false;
        
        if( parseInt(tokens[0]) % 4 == 0 && parseInt(tokens[0]) % 100 != 0 ){
            if( parseInt(tokens[1]) == 2 && parseInt(tokens[2]) > 29 )
                return false;
        } else
            if( parseInt(tokens[1]) == 2 && parseInt(tokens[2]) > 28 )
                return false;
        
        return true;
    }

}
