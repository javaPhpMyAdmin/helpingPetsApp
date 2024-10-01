import { object, string } from 'yup';

export const formSchema = object().shape({
  userEmail: string()
    .required('El email es requerido')
    .email('Introduza un email válido'),
  password: string()
    .required('La contraseña es requerida')
    .min(7, 'La contraseña debe tener al menos 7 caracteres'),
});
