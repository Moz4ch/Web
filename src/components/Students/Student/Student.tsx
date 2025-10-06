'use client';

import type StudentsInterface from '@/types/StudentsInterface';
import styles from './Student.module.scss';

interface StudentProps {
  student: StudentsInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: StudentProps): React.ReactElement => {
  const handleDelete = (): void => {
    onDelete(student.id);
  };

  return (
    <div className={styles.student}>
      <div className={styles.studentInfo}>
        <h3 className={styles.studentName}>
          {student.last_name} {student.first_name} {student.middle_name}
        </h3>
        <p className={styles.studentGroup}>ID группы: {student.groupId}</p>
      </div>
      <button 
        className={styles.deleteButton}
        onClick={handleDelete}
        type="button"
      >
        Удалить
      </button>
    </div>
  );
};

export default Student;
