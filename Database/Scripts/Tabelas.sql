CREATE TABLE tbl_usuario (
    id_usuario      NUMBER(9) PRIMARY KEY,
    email           VARCHAR2(100) NOT NULL UNIQUE,
    senha           VARCHAR2(20) NOT NULL,
    tipo_usuario    VARCHAR2(10) NOT NULL,
    CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('cidadão', 'operador', 'admin'))
);
CREATE TABLE tbl_localizacao (
    id_localizacao  NUMBER(9) PRIMARY KEY,
    latitude        NUMBER(9, 6) NOT NULL,
    longitude       NUMBER(9, 6) NOT NULL,
    bairro          VARCHAR2(50) NOT NULL,
    cidade          VARCHAR2(30) NOT NULL,
    estado          VARCHAR2(2) NOT NULL,
    cep             VARCHAR2(10) NOT NULL
);
CREATE TABLE tbl_perfil (
    id_perfil         NUMBER(9) PRIMARY KEY,
    id_usuario        NUMBER(9) NOT NULL UNIQUE,
    nome_completo     VARCHAR2(100) NOT NULL,
    endereco          VARCHAR2(200) NOT NULL,
    telefone_pessoal  VARCHAR2(20) NOT NULL,
    telefone_emergencia VARCHAR2(20) NOT NULL,
    CONSTRAINT fk_perfil_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario)
);
CREATE TABLE tbl_sensor_iot (
    id_sensor         NUMBER(9) PRIMARY KEY,
    tipo_sensor       VARCHAR2(50) NOT NULL,
    modelo            VARCHAR2(50) NOT NULL,
    localizacao       VARCHAR2(150) NOT NULL,
    id_localizacao    NUMBER(9) NOT NULL,
    CONSTRAINT fk_sensor_local FOREIGN KEY (id_localizacao) REFERENCES tbl_localizacao(id_localizacao),
    CONSTRAINT chk_tipo_sensor CHECK (tipo_sensor IN ('UMIDADE', 'NIVEL', 'IMAGEM'))
);
CREATE TABLE tbl_leitura_sensor (
    id_leitura       NUMBER(9) PRIMARY KEY,
    data_hora        DATE NOT NULL,
    valor            NUMBER(10, 2) NOT NULL,
    id_sensor        NUMBER(9) NOT NULL,
    CONSTRAINT fk_leitura_sensor FOREIGN KEY (id_sensor) REFERENCES tbl_sensor_iot(id_sensor)
);
CREATE TABLE tbl_imagem_sensor (
    id_imagem        NUMBER(9) PRIMARY KEY,
    data_hora        DATE NOT NULL,
    url_armazenada   VARCHAR2(300) NOT NULL,
    id_sensor        NUMBER(9) NOT NULL,
    CONSTRAINT fk_img_sensor FOREIGN KEY (id_sensor) REFERENCES tbl_sensor_iot(id_sensor)
);
CREATE TABLE tbl_abrigo (
    id_abrigo        NUMBER(9) PRIMARY KEY,
    nome             VARCHAR2(100) NOT NULL,
    capacidade       NUMBER NOT NULL,
    disponivel       CHAR(1) NOT NULL,
    id_localizacao   NUMBER(9) NOT NULL,
    CONSTRAINT fk_abrigo_local FOREIGN KEY (id_localizacao) REFERENCES tbl_localizacao(id_localizacao)
);
CREATE TABLE tbl_alerta (
    id_alerta        NUMBER(9) PRIMARY KEY,
    mensagem         VARCHAR2(300) NOT NULL,
    data_emissao     DATE NOT NULL,
    nivel_alerta     VARCHAR2(20) NOT NULL,
    id_usuario       NUMBER(9) NOT NULL,
    id_localizacao   NUMBER(9) NOT NULL,
    CONSTRAINT fk_alerta_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    CONSTRAINT fk_alerta_local FOREIGN KEY (id_localizacao) REFERENCES tbl_localizacao(id_localizacao),
    CONSTRAINT chk_nivel_alerta CHECK (nivel_alerta IN ('BAIXO', 'MÉDIO', 'ALTO'))
);
CREATE TABLE tbl_ocorrencia (
    id_ocorrencia    NUMBER(9) PRIMARY KEY,
    descricao        VARCHAR2(400) NOT NULL,
    data_hora        DATE NOT NULL,
    id_usuario       NUMBER(9) NOT NULL,
    id_localizacao   NUMBER(9) NOT NULL,
    status           VARCHAR2(20) NOT NULL,
    CONSTRAINT fk_ocorr_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    CONSTRAINT fk_ocorr_local FOREIGN KEY (id_localizacao) REFERENCES tbl_localizacao(id_localizacao),
    CONSTRAINT chk_status_ocorrencia CHECK (status IN ('ABERTA', 'EM ATENDIMENTO', 'RESOLVIDA'))
);
CREATE TABLE tbl_rota_segura (
    id_rota NUMBER(9) PRIMARY KEY,
    tempo_estimado NUMBER(5, 2) NOT NULL,
    bloqueada CHAR(1) NOT NULL,
    id_origem NUMBER(9) NOT NULL,
    id_destino NUMBER(9) NOT NULL,
    CONSTRAINT fk_rota_origem FOREIGN KEY (id_origem) REFERENCES tbl_localizacao(id_localizacao),
    CONSTRAINT fk_rota_destino FOREIGN KEY (id_destino) REFERENCES tbl_localizacao(id_localizacao)
);
