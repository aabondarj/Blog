import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './create-article-form.module.scss';
import { ArticleP } from '../../../store/reducer';

interface CreateArticleFormProps {
  onSubmit: (data: any,) => void; // определяем тип функции onSubmit
  dV?: ArticleP,
  isCreate: boolean
}

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({onSubmit, dV, isCreate}) => {
  const { register, handleSubmit, formState: { errors }, control, reset  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  useEffect(() => {
    append('');
  }, [append]);

  const handleDeleteTag = (index: number) => {
    if (index === 0 && fields.length === 1) {
      reset({ tags: [''] });
    } else {
      remove(index);
    }
  };

  console.log(`dV`, dV);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['input-frame']}>
        <label>Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          placeholder='Title'
          className={errors.title ? styles['error-input'] : ''}
          defaultValue={dV ? dV.title : ''}
        />
        {errors.title && <p>Title is required</p>}
      </div>

      <div className={styles['input-frame']}>
        <label>Short description</label>
        <input
          type="text"
          {...register('description', { required: true })}
          placeholder='Short description'
          className={errors.description ? styles['error-input'] : ''}
          defaultValue={dV ? dV.description : ''}
        />
        {errors.description && <p>Description is required</p>}
      </div>

      <div className={styles['input-frame']}>
        <label>Text</label>
        <textarea
          {...register('body', { required: true })}
          placeholder='Text'
          className={`${errors.text ? styles['error-input'] : ''} ${styles[`textarea`]}`}
          rows={10}
          cols={50}
          defaultValue={dV ? dV.body : ''}
        />
        {errors.body && <p>Text is required</p>}
      </div>
      <div className={styles[`tags-frame`]}>
      <label>Tags</label>
      <p className={styles[`error-tags`]}>First you need to fill in the empty field to add a new tag</p>
        {fields.map((field, index) => (
          <div className={styles['input-frame']} key={field.id} style={{flexDirection: 'row'}}>
            <input
              type="text"
              {...register(`tagList.${index}`, { required: true })}
              placeholder="Tag"
              className={styles['tag-input']}
              defaultValue={dV ? dV.tagList[index] : ''}
            />
            <button type="button" onClick={() => handleDeleteTag(index)} className={`${styles['button']} ${styles['button-delete']}`}>DELETE</button>
            <button type="button" onClick={() => append('')} className={`${styles['button']} ${styles['button-add']} ${index !== (fields.length-1) ? styles['hiden-button'] : ''}`}>ADD TAG</button>
            
          </div>
        ))}
      </div>
      

      <button type="submit" className={styles['form-button']}>Send</button>
    </form>
  );
};

export default CreateArticleForm;
