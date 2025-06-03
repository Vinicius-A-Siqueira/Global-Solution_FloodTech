-- Total de ocorrências por cidade:

SELECT l.cidade, COUNT(*) AS total_ocorrencias
FROM tbl_ocorrencia o
JOIN tbl_localizacao l ON o.tbl_localizacao_id_localizacao = l.id_localizacao
GROUP BY l.cidade
ORDER BY total_ocorrencias DESC;

--  Média de valores das leituras dos sensores do tipo 'NIVEL' por cidade:

SELECT l.cidade, AVG(ls.valor) AS media_valor
FROM tbl_leitura_sensor ls
JOIN tbl_sensor_iot s ON ls.tbl_sensor_iot_id_sensor = s.id_sensor
JOIN tbl_localizacao l ON s.tbl_localizacao_id_localizacao = l.id_localizacao
WHERE s.tipo_sensor = 'NIVEL'
GROUP BY l.cidade
ORDER BY media_valor DESC;

--Total de alertas por usuário e nível de alerta:

SELECT u.email, a.nivel_alerta, COUNT(*) AS total_alertas
FROM tbl_alerta a
JOIN tbl_usuario u ON a.tbl_usuario_id_usuario = u.id_usuario
GROUP BY u.email, a.nivel_alerta
ORDER BY u.email;

--Lista de abrigos disponíveis por cidade:

SELECT l.cidade, a.nome, a.capacidade
FROM tbl_abrigo a
JOIN tbl_localizacao l ON a.tbl_localizacao_id_localizacao = l.id_localizacao
WHERE a.disponivel = 'S'
ORDER BY l.cidade, a.nome;

--Rotas seguras bloqueadas entre cidades:

SELECT lo.cidade AS cidade_origem, ld.cidade AS cidade_destino, r.tempo_estimado
FROM tbl_rota_segura r
JOIN tbl_localizacao lo ON r.id_origem_localizacao = lo.id_localizacao
JOIN tbl_localizacao ld ON r.id_destino_localizacao = ld.id_localizacao
WHERE r.bloqueada = 'S'
ORDER BY r.tempo_estimado DESC;
