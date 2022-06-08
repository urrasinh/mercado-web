CREATE DATABASE mercadoweb;

CREATE TABLE frutas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

CREATE TABLE bolsa (
    id SERIAL PRIMARY KEY,
    id_fruta_fk SMALLINT NOT NULL REFERENCES frutas(id)
);

BEGIN TRANSACTION;
INSERT INTO frutas (nombre) VALUES ('Banana');
INSERT INTO frutas (nombre) VALUES ('Cebolla');
INSERT INTO frutas (nombre) VALUES ('Lechuga');
INSERT INTO frutas (nombre) VALUES ('Papa');
INSERT INTO frutas (nombre) VALUES ('Pimenton');
INSERT INTO frutas (nombre) VALUES ('Tomate');