import { connect } from '../connectionDB/connection-db';
import { getTogglEntries } from '../services/entries.service';

export async function updateCaching(){
    await ereaseData();
    let togglEntries: Array<any> = await getTogglEntries();
    await setEntriesToMysql(togglEntries);
    return togglEntries;
}

export async function getEntriesFromMySql(project:string) : Promise<Array<any>|any> {
    const conn = await connect();
    const togglEntries = await conn.query<Array<any>>('SELECT * FROM entries where project = ?', project );
    togglEntries[0].forEach( data => {
        data.tags = JSON.parse(data.tags)
    })
    return togglEntries[0];
}

async function ereaseData(){
    const conn = await connect();
    await conn.query('delete from entries');
}

async function setEntriesToMysql(entries:Array<any>): Promise<any> {
    let insertQuery : string = 'insert into entries( id , pid , tid , uid , description , start , end , updated , dur , user , use_stop, client , project , project_color , project_hex_color , task , billable , is_billable , cur , tags ) '
        insertQuery += 'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const conn = await connect();
    try {
        for(let i = 0; i < entries.length; i++ ){
            await conn.query( insertQuery, [
                entries[i].id,
                entries[i].pid,
                entries[i].tid,
                entries[i].uid,
                entries[i].description,
                entries[i].start,
                entries[i].end,
                entries[i].updated,
                entries[i].dur,
                entries[i].user,
                entries[i].use_stop,
                entries[i].client,
                entries[i].project,
                entries[i].project_color,
                entries[i].project_hex_color,
                entries[i].task,
                entries[i].billable,
                entries[i].is_billable,
                entries[i].cur,
                JSON.stringify(entries[i].tags)
            ]);
        }
    } catch(err){
        console.error(err);
    }
    return {};
}