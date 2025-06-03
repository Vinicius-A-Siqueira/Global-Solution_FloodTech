CREATE OR REPLACE FUNCTION calcular_risco_medio(p_cidade IN VARCHAR2) RETURN NUMBER IS
    v_risco_medio NUMBER;
BEGIN
    SELECT AVG(CASE nivel_alerta
                  WHEN 'BAIXO' THEN 1
                  WHEN 'MÉDIO' THEN 2
                  WHEN 'ALTO' THEN 3
               END)
    INTO v_risco_medio
    FROM tbl_alerta a
    JOIN tbl_localizacao l ON a.tbl_localizacao_id_localizacao = l.id_localizacao
    WHERE l.cidade = p_cidade;
    
    RETURN NVL(v_risco_medio, 0);
END;
/
CREATE OR REPLACE FUNCTION total_ocorrencias_por_bairro(p_bairro IN VARCHAR2) RETURN NUMBER IS
    v_total NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_total
    FROM tbl_ocorrencia o
    JOIN tbl_localizacao l ON o.tbl_localizacao_id_localizacao = l.id_localizacao
    WHERE l.bairro = p_bairro;
    
    RETURN v_total;
END;
/
