import { object, string } from 'yup';

export const formSchema = object().shape({
  reportTitle: string()
    .matches(
      /^[a-zA-Z\s]*$/,
      'El título del reporte solo puede contener letras'
    )
    .required('El título del reporte es requerido'),
  petName: string()
    .matches(
      /^[a-zA-Z\s]*$/,
      'El nombre de la mascota solo puede contener letras'
    )
    .required('El nombre de la mascota es requerido'),
  race: string()
    .matches(/^[a-zA-Z\s]*$/, 'La raza solo puede contener letras')
    .required('La raza es requerida'),
  aboutPet: string()
    .matches(/^[a-zA-Z\s]*$/, 'Solo puede contener letras')
    .required('Acerca del animal es requerida')
    .max(70, 'Maximo 70 caracteres'),
});
