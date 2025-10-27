'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStudents from '@/hooks/useStudents';
import type StudentsInterface from '@/types/StudentsInterface';
import Student from './Student/Student';
import AddStudent from './AddStudent/AddStudent';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, isLoading, error } = useStudents();
  const queryClient = useQueryClient();

  console.log('Students component - students:', students);
  console.log('Students component - isLoading:', isLoading);
  console.log('Students component - error:', error);

  const addStudentMutation = useMutation({
    mutationFn: async (studentData: Omit<StudentsInterface, 'id'>) => {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Ошибка при добавлении студента');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

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

  const handleAddStudent = (studentData: Omit<StudentsInterface, 'id'>): void => {
    addStudentMutation.mutate(studentData);
  };

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
      <AddStudent 
        onSubmit={handleAddStudent} 
        isLoading={addStudentMutation.isPending} 
      />
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
