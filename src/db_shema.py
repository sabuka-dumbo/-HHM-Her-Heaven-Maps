DB_SCHEMA = """
CREATE TABLE Places IF NOT EXSIST
(
    id          CHAR(22),
    creator     CHAR(255),
    latitude    Decimal(8,6),
    longitude   Decimal(9,6),
    creation    TIMESTAMP,
    security      INT(255),
);



"""