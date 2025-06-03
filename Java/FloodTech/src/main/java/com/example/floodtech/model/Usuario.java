package com.example.floodtech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TBL_USUARIO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long id;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "SENHA", nullable = false)
    private String senha;

    @Column(name = "TIPO_USUARIO", nullable = false)
    private String tipoUsuario;
}




