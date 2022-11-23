import * as Yup from 'yup';

const CollectionEditorValidationSchema = Yup.object().shape({
  name: Yup.string().required('* Обовʼязкове поле'),
  words: Yup.array().of(
    Yup.object()
      .shape({
        translation: Yup.string().required('* Обовʼязкове поле'),
        word: Yup.string().required('* Обовʼязкове поле'),
      })
      .required('* Обовʼязкове поле'),
  ),
});

export default CollectionEditorValidationSchema;
