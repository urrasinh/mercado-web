
CREATE TABLE frutas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    img VARCHAR(30) NOT NULL
);

CREATE TABLE bolsa (
    id SERIAL PRIMARY KEY,
    id_fruta_fk SMALLINT NOT NULL REFERENCES frutas(id)
);

BEGIN TRANSACTION;
INSERT INTO frutas (nombre, img) VALUES ('Banana','/banana.png');
INSERT INTO frutas (nombre, img) VALUES ('Cebolla','/cebollas.png');
INSERT INTO frutas (nombre, img) VALUES ('Lechuga', '/lechuga.png');
INSERT INTO frutas (nombre, img) VALUES ('Papa','/papas.png');
INSERT INTO frutas (nombre, img) VALUES ('Pimenton','/pimenton.png');
INSERT INTO frutas (nombre, img) VALUES ('Tomate','/tomate.png');
COMMIT;

