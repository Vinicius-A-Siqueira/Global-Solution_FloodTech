CREATE OR REPLACE PROCEDURE atualizar_status_ocorrencia (
    p_id_ocorrencia IN NUMBER,
    p_novo_status   IN VARCHAR2
) AS
BEGIN
    UPDATE tbl_ocorrencia
    SET status = p_novo_status
    WHERE id_ocorrencia = p_id_ocorrencia;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Ocorrência não encontrada.');
    END IF;
    
    COMMIT;
END;
/