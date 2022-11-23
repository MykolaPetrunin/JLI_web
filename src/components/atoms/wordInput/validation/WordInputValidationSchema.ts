import * as Yup from 'yup';

const WordInputValidationSchema = Yup.object().shape({
  translation: Yup.string().required('* Обовʼязкове поле'),
  word: Yup.string().required('* Обовʼязкове поле'),
});

export default WordInputValidationSchema;
