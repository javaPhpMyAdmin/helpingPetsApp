import { object, string } from 'yup';

export const formSchema = object().shape({
  reportTitle: string()
    .required('El título es requerido')
    .min(25, 'El título debe tener al menos 25 caracteres')
    .max(50, 'El título debe tener menos de 50 caracteres'),
  reportDescription: string()
    .required('La descripción es requerida')
    // .min(25, 'La descripción debe tener al menos 25 caracteres')
    .max(70, 'La descripción debe tener menos de 100 caracteres'),
});
