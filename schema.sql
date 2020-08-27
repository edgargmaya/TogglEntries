create database toggl_entries_bd;

create table entries (
    id INT(11) NOT NULL PRIMARY KEY,
    pid INT(11),
    tid INT(11),
    uid INT(11),
    description VARCHAR(200),
    start VARCHAR(200),
    end VARCHAR(200),
    updated VARCHAR(200),
    dur INT(11),
    user VARCHAR(200),
    use_stop BOOLEAN,
    client VARCHAR(200),
    project VARCHAR(200),
    project_color VARCHAR(200),
    project_hex_color VARCHAR(200),
    task VARCHAR(200),
    billable VARCHAR(200),
    is_billable BOOLEAN,
    cur VARCHAR(200),
    tags VARCHAR(300)
 );