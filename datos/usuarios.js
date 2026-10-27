const CONTRASENA_SAUCEDEMO = process.env.CONTRASENA_SAUCEDEMO || 'secret_sauce';

export const usuarios = {
  estandar: { usuario: 'standard_user', contrasena: CONTRASENA_SAUCEDEMO },
  bloqueado: { usuario: 'locked_out_user', contrasena: CONTRASENA_SAUCEDEMO },
  conProblemas: { usuario: 'problem_user', contrasena: CONTRASENA_SAUCEDEMO },
  conErrores: { usuario: 'error_user', contrasena: CONTRASENA_SAUCEDEMO },
  visual: { usuario: 'visual_user', contrasena: CONTRASENA_SAUCEDEMO },
  lento: { usuario: 'performance_glitch_user', contrasena: CONTRASENA_SAUCEDEMO },
  invalido: { usuario: 'usuario_invalido', contrasena: 'password_incorrecto' },
  inyeccion: { usuario: "' OR '1'='1", contrasena: "' OR '1'='1" },
};

export const usuariosApi = {
  admin: {
    usuario: process.env.USUARIO_API || 'admin',
    contrasena: process.env.CONTRASENA_API || 'password123',
  },
  invalido: { usuario: 'usuario_invalido', contrasena: 'clave_invalida' },
};
