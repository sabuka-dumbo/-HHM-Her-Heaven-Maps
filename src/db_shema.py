DB_SCHEMA = """
CREATE TABLE Places IF NOT EXSIST
(
    id          CHAR(22) UNIQUE PRIMARY_KEY,
    creator     CHAR(255),
    latitude    Decimal(8,6),
    longitude   Decimal(9,6),
    creation    TIMESTAMP,
    security      INT(255),
);

CREATE TABLE Users IF NOT EXSIST
(
    id          CHAR(22) UNIQUE PRIMARY_KEY,
    email       VARCHAR(255) UNIQUE, 
    password    CHAR(32), 
    creation    TIMESTAMP,
    country     CHAR(3), 
    city        VARCHAR(255), 
    state       VARCHAR(255),
    rates       UNSIGNED INT(255),
);

CREATE TABLE Rating IF NOT EXSIST
(
    id          CHAR(22) UNIQUE PRIMARY_KEY,
    place_id    CHAR(22),
    owner_id    CHAR(22),
    VALUE       BYTE
);


"""
