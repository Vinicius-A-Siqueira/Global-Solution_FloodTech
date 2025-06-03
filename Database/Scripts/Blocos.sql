DECLARE
    CURSOR c_bairros IS
        SELECT l.bairro, COUNT(*) AS total_ocorrencias
        FROM tbl_ocorrencia o
        JOIN tbl_localizacao l ON o.tbl_localizacao_id_localizacao = l.id_localizacao
        GROUP BY l.bairro
        HAVING COUNT(*) > 5
        ORDER BY total_ocorrencias DESC;
BEGIN
    FOR r IN c_bairros LOOP
        DBMS_OUTPUT.PUT_LINE('Bairro: ' || r.bairro || ' - Ocorrências: ' || r.total_ocorrencias);
    END LOOP;
END;
/
DECLARE
    v_contador NUMBER;
    v_cidade   VARCHAR2(30) := 'São Paulo'; -- Exemplo de cidade
BEGIN
    SELECT COUNT(*)
    INTO v_contador
    FROM tbl_alerta a
    JOIN tbl_localizacao l ON a.tbl_localizacao_id_localizacao = l.id_localizacao
    WHERE a.nivel_alerta = 'ALTO'
      AND l.cidade = v_cidade
      AND a.data_emissao > SYSDATE - 1; -- alertas nas últimas 24h

    IF v_contador > 3 THEN
        DBMS_OUTPUT.PUT_LINE('Atenção! Muitos alertas ALTO em ' || v_cidade);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Nível de alerta normal em ' || v_cidade);
    END IF;
END;
/
