

export function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "El campo email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Formato del email no es correcto";
  }
  if (!values.password) {
    errors.password = "El campo contraseña es obligatorio";
  } else if (values.password.length < 4) {
    errors.password = "Password debe ser de 4 caracteres o más";
  }
  return errors;
}
