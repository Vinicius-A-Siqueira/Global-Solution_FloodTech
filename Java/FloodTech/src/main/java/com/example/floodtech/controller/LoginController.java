package com.example.floodtech.controller;

import com.example.floodtech.model.Usuario;
import com.example.floodtech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*") // Permite requisições do app React Native
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (usuario == null || !usuario.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        // Opcional: remova a senha antes de retornar
        usuario.setSenha(null);
        return ResponseEntity.ok(usuario);
    }
}
