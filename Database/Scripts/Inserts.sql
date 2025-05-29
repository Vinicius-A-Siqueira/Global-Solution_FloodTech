CREATE SEQUENCE seq_imagem_sensor START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_alerta START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_rota_segura START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE PROCEDURE inserir_usuario (
    p_email        IN VARCHAR2,
    p_senha        IN VARCHAR2,
    p_tipo_usuario IN VARCHAR2
) AS
BEGIN
    INSERT INTO tbl_usuario (email, senha, tipo_usuario)
    VALUES (p_email, p_senha, p_tipo_usuario);
END;
/
BEGIN
    inserir_usuario('c1@email.com', 'senha123', 'cidadão');
    inserir_usuario('c2@email.com', 'senha123', 'operador');
    inserir_usuario('admin@email.com', 'admin123', 'admin');
    inserir_usuario('teste1@email.com', 'teste123', 'cidadão');
    inserir_usuario('teste2@email.com', 'teste456', 'operador');
END;
/
CREATE OR REPLACE PROCEDURE inserir_perfil (
    p_id_usuario          IN NUMBER,
    p_nome_completo       IN VARCHAR2,
    p_endereco            IN VARCHAR2,
    p_telefone_pessoal    IN VARCHAR2,
    p_telefone_emergencia IN VARCHAR2
) AS
BEGIN
    INSERT INTO tbl_perfil (
        tbl_usuario_id_usuario, nome_completo, endereco,
        telefone_pessoal, telefone_emergencia
    ) VALUES (
        p_id_usuario, p_nome_completo, p_endereco,
        p_telefone_pessoal, p_telefone_emergencia
    );
END;
/
BEGIN
    inserir_perfil(1, 'Carlos Silva', 'Rua A, 123', '11999999999', '11888888888');
    inserir_perfil(2, 'Ana Souza', 'Av. B, 456', '11999999988', '11888888877');
    inserir_perfil(3, 'JoÃ£o Lima', 'Rua C, 789', '11999999977', '11888888866');
    inserir_perfil(4, 'Marina Costa', 'Av. D, 321', '11999999966', '11888888855');
    inserir_perfil(5, 'Paulo Alves', 'Rua E, 654', '11999999955', '11888888844');
END;
/
CREATE OR REPLACE PROCEDURE inserir_localizacao (
    p_latitude  IN NUMBER,
    p_longitude IN NUMBER,
    p_bairro    IN VARCHAR2,
    p_cidade    IN VARCHAR2,
    p_estado    IN VARCHAR2,
    p_cep       IN VARCHAR2
) AS
BEGIN
    INSERT INTO tbl_localizacao (
        latitude, longitude, bairro, cidade, estado, cep
    ) VALUES (
        p_latitude, p_longitude, p_bairro, p_cidade, p_estado, p_cep
    );
END;
/

BEGIN
    inserir_localizacao(-23.55, -46.63, 'Centro', 'SÃ£o Paulo', 'SP', '01000-000');
    inserir_localizacao(-22.90, -43.20, 'Copacabana', 'Rio de Janeiro', 'RJ', '22000-000');
    inserir_localizacao(-19.92, -43.94, 'Savassi', 'Belo Horizonte', 'MG', '30140-000');
    inserir_localizacao(-30.03, -51.23, 'Moinhos', 'Porto Alegre', 'RS', '90560-002');
    inserir_localizacao(-3.73, -38.52, 'Aldeota', 'Fortaleza', 'CE', '60175-120');
END;
/
CREATE OR REPLACE PROCEDURE inserir_abrigo (
    p_nome        IN VARCHAR2,
    p_capacidade  IN NUMBER,
    p_disponivel  IN CHAR,
    p_id_local    IN NUMBER
) AS
BEGIN
    INSERT INTO tbl_abrigo (
        nome, capacidade, disponivel, tbl_localizacao_id_localizacao
    ) VALUES (
        p_nome, p_capacidade, p_disponivel, p_id_local
    );
END;
/

BEGIN
    inserir_abrigo('Abrigo Central', 150, 'S', 1);
    inserir_abrigo('Abrigo Zona Sul', 100, 'N', 2);
    inserir_abrigo('Abrigo Norte', 200, 'S', 3);
    inserir_abrigo('Abrigo Leste', 120, 'S', 4);
    inserir_abrigo('Abrigo Oeste', 90, 'N', 5);
END;
/
CREATE OR REPLACE PROCEDURE inserir_sensor (
    p_tipo        IN VARCHAR2,
    p_modelo      IN VARCHAR2,
    p_localizacao IN VARCHAR2,
    p_id_local    IN NUMBER
) AS
BEGIN
    INSERT INTO tbl_sensor_iot (
        tipo_sensor, modelo, localizacao, tbl_localizacao_id_localizacao
    ) VALUES (
        p_tipo, p_modelo, p_localizacao, p_id_local
    );
END;
/

BEGIN
    inserir_sensor('UMIDADE', 'X100', 'Ponto 1', 1);
    inserir_sensor('NIVEL', 'X200', 'Ponto 2', 2);
    inserir_sensor('IMAGEM', 'Cam300', 'Ponto 3', 3);
    inserir_sensor('NIVEL', 'X201', 'Ponto 4', 4);
    inserir_sensor('UMIDADE', 'X101', 'Ponto 5', 5);
END;
/
CREATE OR REPLACE PROCEDURE inserir_leitura (
    p_datahora  IN DATE,
    p_valor     IN NUMBER,
    p_id_sensor IN NUMBER
) AS
BEGIN
    INSERT INTO tbl_leitura_sensor (
        data_hora, valor, tbl_sensor_iot_id_sensor
    ) VALUES (
        p_datahora, p_valor, p_id_sensor
    );
END;
/

BEGIN
    inserir_leitura(SYSDATE, 23.5, 1);
    inserir_leitura(SYSDATE, 45.2, 2);
    inserir_leitura(SYSDATE, 67.8, 3);
    inserir_leitura(SYSDATE, 12.3, 4);
    inserir_leitura(SYSDATE, 34.1, 5);
END;
/

CREATE OR REPLACE PROCEDURE inserir_ocorrencia(
    p_descricao IN VARCHAR2,
    p_data_hora IN DATE,
    p_id_usuario IN NUMBER,
    p_id_localizacao IN NUMBER,
    p_status IN VARCHAR2
) AS
BEGIN
    INSERT INTO tbl_ocorrencia (id_ocorrencia, descricao, data_hora, tbl_usuario_id_usuario, tbl_localizacao_id_localizacao, status)
    VALUES (seq_ocorrencia.NEXTVAL, p_descricao, p_data_hora, p_id_usuario, p_id_localizacao, p_status);
END;
/

BEGIN
    inserir_ocorrencia('Alagamento detectado', SYSDATE - 1, 1, 1, 'ABERTA');
    inserir_ocorrencia('Morador preso em casa', SYSDATE - 2, 2, 1, 'EM ATENDIMENTO');
    inserir_ocorrencia('Risco de deslizamento', SYSDATE - 3, 3, 2, 'RESOLVIDA');
    inserir_ocorrencia('Via interditada', SYSDATE - 4, 1, 2, 'ABERTA');
    inserir_ocorrencia('Sinal de alerta em ponte', SYSDATE - 5, 2, 3, 'EM ATENDIMENTO');
END;
/
CREATE OR REPLACE PROCEDURE inserir_rota_segura(
    p_tempo_estimado IN NUMBER,
    p_bloqueada IN CHAR,
    p_id_origem IN NUMBER,
    p_id_destino IN NUMBER
) AS
BEGIN
    INSERT INTO tbl_rota_segura (id_rota, tempo_estimado, bloqueada, id_origem_localizacao, id_destino_localizacao)
    VALUES (seq_rota_segura.NEXTVAL, p_tempo_estimado, p_bloqueada, p_id_origem, p_id_destino);
END;
/

BEGIN
    inserir_rota_segura(12, 'N', 1, 2);
    inserir_rota_segura(15, 'S', 2, 3);
    inserir_rota_segura(10, 'N', 1, 3);
    inserir_rota_segura(20, 'S', 3, 1);
    inserir_rota_segura(8,  'N', 2, 1);
END;
/
CREATE OR REPLACE PROCEDURE inserir_imagem_sensor(
    p_data_hora IN DATE,
    p_url IN VARCHAR2,
    p_id_sensor IN NUMBER
) AS
BEGIN
    INSERT INTO tbl_imagem_sensor (id_imagem, data_hora, url_armazenada, tbl_sensor_iot_id_sensor)
    VALUES (seq_imagem_sensor.NEXTVAL, p_data_hora, p_url, p_id_sensor);
END;
/

BEGIN
    inserir_imagem_sensor(SYSDATE - 1, 'https://servidor.com/imagem1.jpg', 1);
    inserir_imagem_sensor(SYSDATE - 2, 'https://servidor.com/imagem2.jpg', 1);
    inserir_imagem_sensor(SYSDATE - 3, 'https://servidor.com/imagem3.jpg', 2);
    inserir_imagem_sensor(SYSDATE - 4, 'https://servidor.com/imagem4.jpg', 2);
    inserir_imagem_sensor(SYSDATE - 5, 'https://servidor.com/imagem5.jpg', 3);
END;
/
CREATE OR REPLACE PROCEDURE inserir_alerta(
    p_mensagem IN VARCHAR2,
    p_data_emissao IN DATE,
    p_nivel_alerta IN VARCHAR2,
    p_id_usuario IN NUMBER,
    p_id_localizacao IN NUMBER
) AS
BEGIN
    INSERT INTO tbl_alerta (id_alerta, mensagem, data_emissao, nivel_alerta, tbl_usuario_id_usuario, tbl_localizacao_id_localizacao)
    VALUES (seq_alerta.NEXTVAL, p_mensagem, p_data_emissao, p_nivel_alerta, p_id_usuario, p_id_localizacao);
END;
/

BEGIN
    inserir_alerta('Alerta de enchente iminente', SYSDATE - 1, 'ALTO', 1, 1);
    inserir_alerta('Risco moderado de alagamento', SYSDATE - 2, 'MÉDIO', 2, 1);
    inserir_alerta('Monitoramento preventivo', SYSDATE - 3, 'BAIXO', 3, 2);
    inserir_alerta('Volume de chuva elevado', SYSDATE - 4, 'ALTO', 1, 2);
    inserir_alerta('Zona em atenção', SYSDATE - 5, 'MÉDIO', 2, 3);
END;
/