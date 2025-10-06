'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStudents from '@/hooks/useStudents';
import type StudentsInterface from '@/types/StudentsInterface';
import Student from './Student/Student';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, isLoading, error } = useStudents();
  const queryClient = useQueryClient();

  const deleteStudentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении студента');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const handleDelete = (id: number): void => {
    deleteStudentMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className={styles.Students}>
        <p>Загрузка студентов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.Students}>
        <p>Ошибка загрузки студентов: {error.message}</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className={styles.Students}>
        <p>Студенты не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.Students}>
      {students.map((student: StudentsInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Students;
