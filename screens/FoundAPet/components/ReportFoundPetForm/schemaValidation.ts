import { object, string } from 'yup';

export const formSchema = object().shape({
  reportTitle: string()
    .required('El título es requerido')
    .min(10, 'El título debe tener al menos 3 caracteres'),
  reportDescription: string()
    .required('La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(70, 'La descripción debe tener menos de 100 caracteres'),
});
