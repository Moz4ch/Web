'use client';

import useStudents from '@/hooks/useStudents';
import type StudentsInterface from '@/types/StudentsInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, isLoading, error } = useStudents();

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
        <div key={student.id} className={styles.studentItem}>
          <h3>
            {student.last_name} {student.first_name} {student.middle_name}
          </h3>
          <p>ID группы: {student.groupId}</p>
        </div>
      ))}
    </div>
  );
};

export default Students;
