import { object, string } from 'yup';

export const formSchema = object().shape({
  petName: string()
    .matches(
      /^[a-zA-Z]+$/,
      'El nombre de la mascota solo puede contener letras'
    )
    .required('El nombre de la mascota es requerido'),
  race: string()
    .matches(/^[a-zA-Z]+$/, 'La raza solo puede contener letras')
    .required('La raza es requerida'),
  aboutPet: string()
    .matches(/^[a-zA-Z]+$/, 'Solo puede contener letras')
    .required('Acerca del animal es requerida')
    .min(5, 'Debe tener al menos 5 caracteres')
    .max(70, 'Maximo 70 caracteres'),
});
