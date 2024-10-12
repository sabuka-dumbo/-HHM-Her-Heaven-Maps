import sqlite3

DB_SCHEMA = """
CREATE TABLE Places IF NOT EXSIST
(
    id CHAR(22),
    latitude Decimal(8,6),
    longitude Decimal(9,6),
    creation TIMESTAMP
);



"""

conn = sqlite3.connect("db.sqlite")
