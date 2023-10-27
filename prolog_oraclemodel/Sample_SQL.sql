-- Generated by Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   at:        2023-09-08 22:44:15 AEST
--   site:      Oracle Database 12c
--   type:      Oracle Database 12c



DROP TABLE tag CASCADE CONSTRAINTS;

DROP TABLE task CASCADE CONSTRAINTS;

DROP TABLE task_assignee CASCADE CONSTRAINTS;

DROP TABLE task_tag CASCADE CONSTRAINTS;

DROP TABLE "User" CASCADE CONSTRAINTS;

-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE tag (
    tag_id   NUMBER(10, 100) NOT NULL,
    tag_name VARCHAR2(50) NOT NULL
);

COMMENT ON COLUMN tag.tag_id IS
    'Tag ID';

COMMENT ON COLUMN tag.tag_name IS
    'Name of Tag';

ALTER TABLE tag ADD CONSTRAINT tag_pk PRIMARY KEY ( tag_id );

CREATE TABLE task (
    task_id          NUMBER(10) NOT NULL,
    task_name        VARCHAR2(50 CHAR) NOT NULL,
    task_type        CHAR(1 CHAR) NOT NULL,
    task_storypoints NUMBER(10, 10) NOT NULL,
    task_priority    CHAR(1 CHAR) NOT NULL,
    task_description VARCHAR2(250 CHAR) NOT NULL,
    task_status      CHAR(2 CHAR) DEFAULT 'NS' NOT NULL,
    task_stage       CHAR(1 CHAR) NOT NULL
);

ALTER TABLE task
    ADD CONSTRAINT chk_tasktype CHECK ( task_type IN ( 'B', 'S' ) );

ALTER TABLE task
    ADD CONSTRAINT chk_taskpoints CHECK ( task_storypoints BETWEEN 0 AND 10 );

ALTER TABLE task
    ADD CONSTRAINT chk_taskpriority CHECK ( task_priority IN ( 'H', 'L', 'M' ) );

ALTER TABLE task
    ADD CONSTRAINT chk_taskstatus CHECK ( task_status IN ( 'CM', 'IP', 'NS' ) );

ALTER TABLE task
    ADD CONSTRAINT chk_taskstage CHECK ( task_stage IN ( 'D', 'P', 'T' ) );

COMMENT ON COLUMN task.task_id IS
    'Unique Surrogate Key for Task ID';

COMMENT ON COLUMN task.task_name IS
    'Name of the Task';

COMMENT ON COLUMN task.task_type IS
    'Type of Task,  S - Story, B - Bug';

COMMENT ON COLUMN task.task_storypoints IS
    'Story Points ranging from 0 to 10.';

COMMENT ON COLUMN task.task_priority IS
    'Priority of Task (Must be L - low, M- Medium, H - High)';

COMMENT ON COLUMN task.task_description IS
    'Description of Task';

COMMENT ON COLUMN task.task_status IS
    'Status of Task (NS - Not Started, IP - In Progress, CM - Completed)';

COMMENT ON COLUMN task.task_stage IS
    'Current Stage for Task (P - Planning, D - Development, T - Testing)';

ALTER TABLE task ADD CONSTRAINT task_pk PRIMARY KEY ( task_id );

CREATE TABLE task_assignee (
    task_id NUMBER(10) NOT NULL,
    user_id NUMBER(10, 100) NOT NULL
);

COMMENT ON COLUMN task_assignee.task_id IS
    'Unique Surrogate Key for Task ID';

COMMENT ON COLUMN task_assignee.user_id IS
    'ID of User (Surrogate Primary Key)';

ALTER TABLE task_assignee ADD CONSTRAINT task_assignee_pk PRIMARY KEY ( task_id,
                                                                        user_id );

CREATE TABLE task_tag (
    task_id NUMBER(10) NOT NULL,
    tag_id  NUMBER(10, 100) NOT NULL
);

COMMENT ON COLUMN task_tag.task_id IS
    'Unique Surrogate Key for Task ID';

COMMENT ON COLUMN task_tag.tag_id IS
    'Tag ID';

ALTER TABLE task_tag ADD CONSTRAINT task_tag_pk PRIMARY KEY ( task_id,
                                                              tag_id );

CREATE TABLE "User" (
    user_id   NUMBER(10, 100) NOT NULL,
    user_name VARCHAR2(50) NOT NULL
);

COMMENT ON COLUMN "User".user_id IS
    'ID of User (Surrogate Primary Key)';

COMMENT ON COLUMN "User".user_name IS
    'Name of User';

ALTER TABLE "User" ADD CONSTRAINT user_pk PRIMARY KEY ( user_id );

ALTER TABLE task_assignee
    ADD CONSTRAINT task_assignee_task_fk FOREIGN KEY ( task_id )
        REFERENCES task ( task_id );

ALTER TABLE task_assignee
    ADD CONSTRAINT task_assignee_user_fk FOREIGN KEY ( user_id )
        REFERENCES "User" ( user_id );

ALTER TABLE task_tag
    ADD CONSTRAINT task_tag_tag_fk FOREIGN KEY ( tag_id )
        REFERENCES tag ( tag_id );

ALTER TABLE task_tag
    ADD CONSTRAINT task_tag_task_fk FOREIGN KEY ( task_id )
        REFERENCES task ( task_id );



-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             0
-- ALTER TABLE                             14
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- TSDP POLICY                              0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
