create database BlogDuCinema;
use BlogDuCinema;

CREATE TABLE history
(
    `id_history`       INT            NOT NULL    AUTO_INCREMENT COMMENT '아이디', 
    `title_history`    VARCHAR(45)    NULL        COMMENT '제목', 
    `content_history`  TEXT           NOT NULL    COMMENT '내용', 
    PRIMARY KEY (id_history)
);

ALTER TABLE history COMMENT '영화의 역사';

CREATE TABLE genre
(
    `id_genre`       INT            NOT NULL    AUTO_INCREMENT COMMENT '아이디', 
    `title_genre`    VARCHAR(45)    NULL        COMMENT '제목', 
    `content_genre`  TEXT           NOT NULL    COMMENT '내용', 
    PRIMARY KEY (id_genre)
);

ALTER TABLE genre COMMENT '영화의 장르';

CREATE TABLE dictionary
(
    `id_dict`       INT            NOT NULL    AUTO_INCREMENT COMMENT '아이디', 
    `title_dict`    VARCHAR(100)    NULL        COMMENT '제목', 
    `alpha`			varchar(2)				   COMMENT '첫글자',
    `content_dict`  TEXT           NOT NULL    COMMENT '내용', 
    PRIMARY KEY (id_dict)
);

ALTER TABLE dictionary COMMENT '영화용어 사전';