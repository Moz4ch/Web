'use client';

import { useForm } from 'react-hook-form';
import type StudentsInterface from '@/types/StudentsInterface';
import styles from './AddStudent.module.scss';

interface AddStudentProps {
  onSubmit: (data: Omit<StudentsInterface, 'id'>) => void;
  isLoading?: boolean;
}

interface FormData {
  first_name: string;
  last_name: string;
  middle_name: string;
  groupId: number;
}

const AddStudent = ({ onSubmit, isLoading = false }: AddStudentProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onFormSubmit = (data: FormData): void => {
    onSubmit(data);
    reset();
  };

  return (
    <div className={styles.AddStudent}>
      <h3>Добавить студента</h3>
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="first_name">Имя:</label>
          <input
            id="first_name"
            type="text"
            {...register('first_name', {
              required: 'Имя обязательно для заполнения',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа',
              },
            })}
            className={errors.first_name ? styles.error : ''}
          />
          {errors.first_name && (
            <span className={styles.errorMessage}>{errors.first_name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="last_name">Фамилия:</label>
          <input
            id="last_name"
            type="text"
            {...register('last_name', {
              required: 'Фамилия обязательна для заполнения',
              minLength: {
                value: 2,
                message: 'Фамилия должна содержать минимум 2 символа',
              },
            })}
            className={errors.last_name ? styles.error : ''}
          />
          {errors.last_name && (
            <span className={styles.errorMessage}>{errors.last_name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="middle_name">Отчество:</label>
          <input
            id="middle_name"
            type="text"
            {...register('middle_name', {
              required: 'Отчество обязательно для заполнения',
              minLength: {
                value: 2,
                message: 'Отчество должно содержать минимум 2 символа',
              },
            })}
            className={errors.middle_name ? styles.error : ''}
          />
          {errors.middle_name && (
            <span className={styles.errorMessage}>{errors.middle_name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="groupId">ID группы:</label>
          <input
            id="groupId"
            type="number"
            {...register('groupId', {
              required: 'ID группы обязателен для заполнения',
              min: {
                value: 1,
                message: 'ID группы должен быть больше 0',
              },
            })}
            className={errors.groupId ? styles.error : ''}
          />
          {errors.groupId && (
            <span className={styles.errorMessage}>{errors.groupId.message}</span>
          )}
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Добавление...' : 'Добавить студента'}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
