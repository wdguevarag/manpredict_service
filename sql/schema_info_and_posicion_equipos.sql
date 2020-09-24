BEGIN;
-- Role: controlreader
-- DROP ROLE controlreader;
--

CREATE ROLE controlreader WITH
LOGIN
NOSUPERUSER
INHERIT
NOCREATEDB
NOCREATEROLE
NOREPLICATION
ENCRYPTED PASSWORD 'md5c66fdacdfb74aa860fa15dfc73761912'
VALID UNTIL '2100-12-31 00:00:00-05';



-- SCHEMA: tps

DROP SCHEMA info CASCADE;

CREATE SCHEMA info
  AUTHORIZATION postgres;

COMMENT ON SCHEMA info
  IS 'standard info schema';

GRANT ALL ON SCHEMA info TO PUBLIC;

GRANT ALL ON SCHEMA info TO postgres;

GRANT ALL ON SCHEMA info TO controlhealth;

GRANT ALL ON SCHEMA info TO controlreader;


-- View: info.equipments_position

-- DROP VIEW info.equipments_position;

CREATE OR REPLACE VIEW info.equipments_position
AS
SELECT eq.id_equipo         AS equipment_id,
       eq.nombre_eq         AS equipment_name,
       realt.x_coor_tr      AS coorx_local,
       realt.y_coor_tr      AS coory_local,
       realt.z_coor_tr      AS coorz_loca,
       realt.lat_coor_tr    AS latitud,
       realt.lon_coor_tr    AS longitud,
       realt.tiem_update_tr AS last_update

FROM tp_equipos eq
       LEFT JOIN tp_eqp_tiempo_real realt ON realt.id_eqp_tr = ((SELECT tp_eqp_tiempo_real.id_eqp_tr
                                                                 FROM tp_eqp_tiempo_real
                                                                 WHERE tp_eqp_tiempo_real.id_equipo_tr = eq.id_equipo
                                                                 ORDER BY tp_eqp_tiempo_real.tiem_update_tr DESC
                                                                 LIMIT 1))
       LEFT JOIN ta_equipo_info_detalle eid ON eq.id_equipo = eid.id_equipo
WHERE eq.tiem_elimin IS NULL
  AND eq.conexion = 1
ORDER BY  eq.id_equipo;

ALTER TABLE info.equipments_position
  OWNER TO controlhealth;

GRANT SELECT ON TABLE info.equipments_position TO controlreader;

END;