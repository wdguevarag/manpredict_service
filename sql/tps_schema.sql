BEGIN;

-- SCHEMA: tps

DROP SCHEMA IF EXISTS tps CASCADE;

CREATE SCHEMA tps
  AUTHORIZATION postgres;

COMMENT ON SCHEMA tps
  IS 'standard info schema';

GRANT ALL ON SCHEMA tps TO PUBLIC;

GRANT ALL ON SCHEMA tps TO postgres;

GRANT ALL ON SCHEMA tps TO controlhealth;

GRANT ALL ON SCHEMA tps TO controlreader;

DROP TABLE IF EXISTS tps.configuration;
CREATE TABLE IF NOT EXISTS tps.configuration
(
  id            bigint primary key,
  name          varchar(500),
  description   varchar(500),
  default_value varchar(500),
  create_time   timestamp,
  update_time   timestamp

);
ALTER TABLE tps.configuration
  OWNER to controlhealth;

GRANT ALL ON TABLE tps.configuration TO controlhealth;

GRANT SELECT ON TABLE tps.configuration TO controlreader;


CREATE TABLE IF NOT EXISTS tps.details_configurations
(
  id               bigint primary key,
  configuration_id bigint references tps.configuration (id),
  value            varchar(500),
  create_time      timestamp,
  update_time      timestamp

);

ALTER TABLE tps.details_configurations
  OWNER to controlhealth;

GRANT ALL ON TABLE tps.details_configurations TO controlhealth;

GRANT SELECT ON TABLE tps.details_configurations TO controlreader;



CREATE TABLE IF NOT EXISTS tps.equipment_config
(
  equipment_id   bigint primary key references public.tp_equipos (id_equipo),
  icon           smallint,
  streaming_path varchar(500),
  create_time    timestamp,
  update_time    timestamp

);

ALTER TABLE tps.equipment_config
  OWNER to controlhealth;

GRANT ALL ON TABLE tps.equipment_config TO controlhealth;

GRANT SELECT ON TABLE tps.equipment_config TO controlreader;



CREATE TABLE IF NOT EXISTS tps.abrassion_real_time
(
  equipment_id    bigint references public.tp_equipos (id_equipo),
  tooth_size      integer[],
  abrassion_level integer[],
  abrasion_ratio  decimal[],
  create_time     timestamp,
  update_time     timestamp

);


ALTER TABLE tps.abrassion_real_time
  OWNER to controlhealth;

GRANT ALL ON TABLE tps.abrassion_real_time TO controlhealth;

GRANT SELECT ON TABLE tps.abrassion_real_time TO controlreader;


DROP TABLE IF EXISTS tps.abrassion_historic;

CREATE TABLE IF NOT EXISTS tps.abrassion_historic
(
  equipment_id    bigint references public.tp_equipos (id_equipo),
  tooth_size      integer[],
  abrassion_level integer[],
  abrasion_ratio  decimal[],
  create_time     timestamp

);

ALTER TABLE tps.abrassion_historic
  OWNER to controlhealth;

GRANT ALL ON TABLE tps.abrassion_historic TO controlhealth;

GRANT SELECT ON TABLE tps.abrassion_historic TO controlreader;

CREATE INDEX IF NOT EXISTS equipment_id_abrassion_historic_id_idx ON tps.abrassion_historic (equipment_id);
CREATE INDEX IF NOT EXISTS create_time_abrassion_historic_id_idx ON tps.abrassion_historic (create_time);


DROP VIEW IF EXISTS tps.configuration_tps;
CREATE OR REPLACE VIEW tps.configuration_tps AS
SELECT conf.id, conf.name,dc.value
FROM tps.configuration conf
       left join tps.details_configurations dc on dc.configuration_id = conf.id;

alter view tps.configuration_tps OWNER to controlhealth;


DROP VIEW IF EXISTS tps.equipments_teeth_real_time;
CREATE OR REPLACE VIEW tps.equipments_teeth_real_time AS
SELECT ec.equipment_id
     ,te.nombre_eq                           nameEquipment
     ,ec.icon                                fleet_icon
     ,ec.streaming_path                      streaming_url
     ,art.abrasion_ratio
     ,art.abrassion_level
     ,art.tooth_size
     , round(random() * 38 + 1)::integer  as days_passed
     , round(random() * 49 + 40)::integer as planned_days
FROM tps.equipment_config ec
       left join public.tp_equipos te on te.id_equipo = ec.equipment_id
       left join tps.abrassion_real_time art on art.equipment_id = ec.equipment_id;
alter view tps.equipments_teeth_real_time OWNER to controlhealth;



DROP VIEW IF EXISTS tps.history_last_day;
CREATE OR REPLACE VIEW tps.history_last_day AS
  WITH row_data_week AS (SELECT equipment_id                                                                                   equipment_id
                              ,unnest(tooth_size)                                                                              tooth_size
                              ,unnest(abrassion_level)                                                                         abrassion_level
                              ,unnest(abrasion_ratio)                                                                          abrasion_ratio
                              ,unnest((SELECT array_agg(i) FROM (SELECT ix as i FROM generate_series(1, 6) ix) i2)::integer[]) inx
                              ,create_time
                         FROM tps.abrassion_historic
                         where create_time > date_trunc('day', now()))
    SELECT equipment_id
         ,to_char(create_time, 'yyyy-mm-dd HH24')
         , inx
         ,round(avg(tooth_size))      tooth_size
         ,round(avg(abrassion_level)) abrassion_level
         ,round(avg(abrasion_ratio))  abrasion_ratio
    FROM row_data_week
    group by equipment_id,to_char(create_time, 'yyyy-mm-dd HH24'),inx
    order by equipment_id,to_char(create_time, 'yyyy-mm-dd HH24'),inx;
alter view tps.history_last_day OWNER to controlhealth;

DROP VIEW IF EXISTS tps.history_last_week;
CREATE OR REPLACE VIEW tps.history_last_week AS
  WITH row_data_week AS (SELECT equipment_id                                                                                   equipment_id
                              ,unnest(tooth_size)                                                                              tooth_size
                              ,unnest(abrassion_level)                                                                         abrassion_level
                              ,unnest(abrasion_ratio)                                                                          abrasion_ratio
                              ,unnest((SELECT array_agg(i) FROM (SELECT ix as i FROM generate_series(1, 6) ix) i2)::integer[]) inx
                              ,create_time
                         FROM tps.abrassion_historic
                         where create_time > now() - interval '7 days')
    SELECT equipment_id
         ,to_char(create_time, 'yyyy-mm-dd')
         , inx
         ,round(avg(tooth_size))      tooth_size
         ,round(avg(abrassion_level)) abrassion_level
         ,round(avg(abrasion_ratio))  abrasion_ratio
    FROM row_data_week
    group by equipment_id,to_char(create_time, 'yyyy-mm-dd'),inx
    order by equipment_id,to_char(create_time, 'yyyy-mm-dd'),inx;
alter view tps.history_last_week OWNER to controlhealth;


DROP VIEW IF EXISTS tps.history_last_fortnight;
CREATE OR REPLACE VIEW tps.history_last_fortnight AS
  WITH row_data_week AS (SELECT equipment_id                                                                                   equipment_id
                              ,unnest(tooth_size)                                                                              tooth_size
                              ,unnest(abrassion_level)                                                                         abrassion_level
                              ,unnest(abrasion_ratio)                                                                          abrasion_ratio
                              ,unnest((SELECT array_agg(i) FROM (SELECT ix as i FROM generate_series(1, 6) ix) i2)::integer[]) inx
                              ,create_time
                         FROM tps.abrassion_historic
                         where create_time > now() - interval '15 days')
    SELECT equipment_id
         ,to_char(create_time, 'yyyy-mm-dd')
         , inx
         ,round(avg(tooth_size))      tooth_size
         ,round(avg(abrassion_level)) abrassion_level
         ,round(avg(abrasion_ratio))  abrasion_ratio
    FROM row_data_week
    group by equipment_id,to_char(create_time, 'yyyy-mm-dd'),inx
    order by equipment_id,to_char(create_time, 'yyyy-mm-dd'),inx;
alter view tps.history_last_fortnight OWNER to controlhealth;


DROP VIEW IF EXISTS tps.history_last_month;
CREATE OR REPLACE VIEW tps.history_last_month AS
  WITH row_data_week AS (SELECT equipment_id                                                                                   equipment_id
                              ,unnest(tooth_size)                                                                              tooth_size
                              ,unnest(abrassion_level)                                                                         abrassion_level
                              ,unnest(abrasion_ratio)                                                                          abrasion_ratio
                              ,unnest((SELECT array_agg(i) FROM (SELECT ix as i FROM generate_series(1, 6) ix) i2)::integer[]) inx
                              ,create_time
                         FROM tps.abrassion_historic
                         where create_time > date_trunc('month', now()))
    SELECT equipment_id
         ,to_char(create_time, 'yyyy-mm-dd')
         , inx
         ,round(avg(tooth_size))      tooth_size
         ,round(avg(abrassion_level)) abrassion_level
         ,round(avg(abrasion_ratio))  abrasion_ratio
    FROM row_data_week
    group by equipment_id,to_char(create_time, 'yyyy-mm-dd'),inx
    order by equipment_id,to_char(create_time, 'yyyy-mm-dd'),inx;
alter view tps.history_last_month OWNER to controlhealth;


DROP VIEW IF EXISTS tps.history_last_year;
CREATE OR REPLACE VIEW tps.history_last_year AS
  WITH row_data_week AS (SELECT equipment_id                                                                                   equipment_id
                              ,unnest(tooth_size)                                                                              tooth_size
                              ,unnest(abrassion_level)                                                                         abrassion_level
                              ,unnest(abrasion_ratio)                                                                          abrasion_ratio
                              ,unnest((SELECT array_agg(i) FROM (SELECT ix as i FROM generate_series(1, 6) ix) i2)::integer[]) inx
                              ,create_time
                         FROM tps.abrassion_historic
                         where create_time > date_trunc('year', now()))
    SELECT equipment_id
         ,to_char(create_time, 'yyyy-mm')
         , inx
         ,round(avg(tooth_size))      tooth_size
         ,round(avg(abrassion_level)) abrassion_level
         ,round(avg(abrasion_ratio))  abrasion_ratio
    FROM row_data_week
    group by equipment_id,to_char(create_time, 'yyyy-mm'),inx
    order by equipment_id,to_char(create_time, 'yyyy-mm'),inx;
alter view tps.history_last_year OWNER to controlhealth;



DROP VIEW IF EXISTS tps.history_last_day_json;
CREATE OR REPLACE VIEW tps.history_last_day_json AS
SELECT ot.equipment_id,
       ot.to_char dayHourMont,
       json_build_object(
           '1', json_build_object(
           'abrassion_level', abrassion_level [ 1],
           'tooth_size', tooth_size [ 1],
           'abrasion_ratio', abrasion_ratio [ 1]
         )::character varying
         ,
           '2', json_build_object(
               'abrassion_level', abrassion_level [ 2],
               'tooth_size', tooth_size [ 2],
               'abrasion_ratio', abrasion_ratio [ 2]
             )::character varying,
           '3', json_build_object(
               'abrassion_level', abrassion_level [ 3],
               'tooth_size', tooth_size [ 3],
               'abrasion_ratio', abrasion_ratio [ 3]
             )::character varying,
           '4', json_build_object(
               'abrassion_level', abrassion_level [ 4],
               'tooth_size', tooth_size [ 4],
               'abrasion_ratio', abrasion_ratio [ 4]
             )::character varying,
           '5', json_build_object(
               'abrassion_level', abrassion_level [ 5],
               'tooth_size', tooth_size [ 5],
               'abrasion_ratio', abrasion_ratio [ 5]
             )::character varying,
           '6', json_build_object(
               'abrassion_level', abrassion_level [ 6],
               'tooth_size', tooth_size [ 6],
               'abrasion_ratio', abrasion_ratio [ 6]
             )::character varying
         ) as teeth_info
FROM (SELECT t.equipment_id,
             to_char,
             array_agg(t.tooth_size)      tooth_size,
             array_agg(t.abrassion_level) abrassion_level,
             array_agg(t.abrasion_ratio)  abrasion_ratio
      FROM tps.history_last_day t
      group by t.equipment_id,to_char) ot;


DROP VIEW IF EXISTS tps.history_last_week_json;
CREATE OR REPLACE VIEW tps.history_last_week_json AS
SELECT ot.equipment_id,
       ot.to_char dayHourMont,
       json_build_object(
           '1', json_build_object(
           'abrassion_level', abrassion_level [ 1],
           'tooth_size', tooth_size [ 1],
           'abrasion_ratio', abrasion_ratio [ 1]
         )::character varying
         ,
           '2', json_build_object(
               'abrassion_level', abrassion_level [ 2],
               'tooth_size', tooth_size [ 2],
               'abrasion_ratio', abrasion_ratio [ 2]
             )::character varying,
           '3', json_build_object(
               'abrassion_level', abrassion_level [ 3],
               'tooth_size', tooth_size [ 3],
               'abrasion_ratio', abrasion_ratio [ 3]
             )::character varying,
           '4', json_build_object(
               'abrassion_level', abrassion_level [ 4],
               'tooth_size', tooth_size [ 4],
               'abrasion_ratio', abrasion_ratio [ 4]
             )::character varying,
           '5', json_build_object(
               'abrassion_level', abrassion_level [ 5],
               'tooth_size', tooth_size [ 5],
               'abrasion_ratio', abrasion_ratio [ 5]
             )::character varying,
           '6', json_build_object(
               'abrassion_level', abrassion_level [ 6],
               'tooth_size', tooth_size [ 6],
               'abrasion_ratio', abrasion_ratio [ 6]
             )::character varying
         ) as teeth_info
FROM (SELECT t.equipment_id,
             to_char,
             array_agg(t.tooth_size)      tooth_size,
             array_agg(t.abrassion_level) abrassion_level,
             array_agg(t.abrasion_ratio)  abrasion_ratio
      FROM tps.history_last_week t
      group by t.equipment_id,to_char) ot;


DROP VIEW IF EXISTS tps.history_last_fortnight_json;
CREATE OR REPLACE VIEW tps.history_last_fortnight_json AS
SELECT ot.equipment_id,
       ot.to_char dayHourMont,
       json_build_object(
           '1', json_build_object(
           'abrassion_level', abrassion_level [ 1],
           'tooth_size', tooth_size [ 1],
           'abrasion_ratio', abrasion_ratio [ 1]
         )::character varying
         ,
           '2', json_build_object(
               'abrassion_level', abrassion_level [ 2],
               'tooth_size', tooth_size [ 2],
               'abrasion_ratio', abrasion_ratio [ 2]
             )::character varying,
           '3', json_build_object(
               'abrassion_level', abrassion_level [ 3],
               'tooth_size', tooth_size [ 3],
               'abrasion_ratio', abrasion_ratio [ 3]
             )::character varying,
           '4', json_build_object(
               'abrassion_level', abrassion_level [ 4],
               'tooth_size', tooth_size [ 4],
               'abrasion_ratio', abrasion_ratio [ 4]
             )::character varying,
           '5', json_build_object(
               'abrassion_level', abrassion_level [ 5],
               'tooth_size', tooth_size [ 5],
               'abrasion_ratio', abrasion_ratio [ 5]
             )::character varying,
           '6', json_build_object(
               'abrassion_level', abrassion_level [ 6],
               'tooth_size', tooth_size [ 6],
               'abrasion_ratio', abrasion_ratio [ 6]
             )::character varying
         ) as teeth_info
FROM (SELECT t.equipment_id,
             to_char,
             array_agg(t.tooth_size)      tooth_size,
             array_agg(t.abrassion_level) abrassion_level,
             array_agg(t.abrasion_ratio)  abrasion_ratio
      FROM tps.history_last_fortnight t
      group by t.equipment_id,to_char) ot;


DROP VIEW IF EXISTS tps.history_last_month_json;
CREATE OR REPLACE VIEW tps.history_last_month_json AS
SELECT ot.equipment_id,
       ot.to_char dayHourMont,
       json_build_object(
           '1', json_build_object(
           'abrassion_level', abrassion_level [ 1],
           'tooth_size', tooth_size [ 1],
           'abrasion_ratio', abrasion_ratio [ 1]
         )::character varying
         ,
           '2', json_build_object(
               'abrassion_level', abrassion_level [ 2],
               'tooth_size', tooth_size [ 2],
               'abrasion_ratio', abrasion_ratio [ 2]
             )::character varying,
           '3', json_build_object(
               'abrassion_level', abrassion_level [ 3],
               'tooth_size', tooth_size [ 3],
               'abrasion_ratio', abrasion_ratio [ 3]
             )::character varying,
           '4', json_build_object(
               'abrassion_level', abrassion_level [ 4],
               'tooth_size', tooth_size [ 4],
               'abrasion_ratio', abrasion_ratio [ 4]
             )::character varying,
           '5', json_build_object(
               'abrassion_level', abrassion_level [ 5],
               'tooth_size', tooth_size [ 5],
               'abrasion_ratio', abrasion_ratio [ 5]
             )::character varying,
           '6', json_build_object(
               'abrassion_level', abrassion_level [ 6],
               'tooth_size', tooth_size [ 6],
               'abrasion_ratio', abrasion_ratio [ 6]
             )::character varying
         ) as teeth_info
FROM (SELECT t.equipment_id,
             to_char,
             array_agg(t.tooth_size)      tooth_size,
             array_agg(t.abrassion_level) abrassion_level,
             array_agg(t.abrasion_ratio)  abrasion_ratio
      FROM tps.history_last_month t
      group by t.equipment_id,to_char) ot;



DROP VIEW IF EXISTS tps.history_last_year_json;
CREATE OR REPLACE VIEW tps.history_last_year_json AS
SELECT ot.equipment_id,
       ot.to_char dayHourMont,
       json_build_object(
           '1', json_build_object(
           'abrassion_level', abrassion_level [ 1],
           'tooth_size', tooth_size [ 1],
           'abrasion_ratio', abrasion_ratio [ 1]
         )::character varying
         ,
           '2', json_build_object(
               'abrassion_level', abrassion_level [ 2],
               'tooth_size', tooth_size [ 2],
               'abrasion_ratio', abrasion_ratio [ 2]
             )::character varying,
           '3', json_build_object(
               'abrassion_level', abrassion_level [ 3],
               'tooth_size', tooth_size [ 3],
               'abrasion_ratio', abrasion_ratio [ 3]
             )::character varying,
           '4', json_build_object(
               'abrassion_level', abrassion_level [ 4],
               'tooth_size', tooth_size [ 4],
               'abrasion_ratio', abrasion_ratio [ 4]
             )::character varying,
           '5', json_build_object(
               'abrassion_level', abrassion_level [ 5],
               'tooth_size', tooth_size [ 5],
               'abrasion_ratio', abrasion_ratio [ 5]
             )::character varying,
           '6', json_build_object(
               'abrassion_level', abrassion_level [ 6],
               'tooth_size', tooth_size [ 6],
               'abrasion_ratio', abrasion_ratio [ 6]
             )::character varying
         ) as teeth_info
FROM (SELECT t.equipment_id,
             to_char,
             array_agg(t.tooth_size)      tooth_size,
             array_agg(t.abrassion_level) abrassion_level,
             array_agg(t.abrasion_ratio)  abrasion_ratio
      FROM tps.history_last_year t
      group by t.equipment_id,to_char) ot;


-- -- ]


END;

