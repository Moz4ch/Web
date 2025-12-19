'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent from './AddStudent';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      // отладка - 1
      // debugger;
      // console.log('onDeleteHandler', studentId);
      deleteStudentMutate(studentId);
    }
  };

  const onAddHandler = (studentData: Omit<StudentInterface, 'id'>): void => {
    // // отладка - 2
    //   debugger;
    //   console.log('onAddHandler', studentData);
    addStudentMutate(studentData); // Теперь contacts есть в studentData
  };

  return (
    <div className={styles.Students}>
      <div className={styles.list}>
        {students.map((student: StudentInterface) => (
          <Student
            key={student.id}
            student={student}
            onDelete={onDeleteHandler}
          />
        ))}
      </div>
      <div className={styles.form}>
        <h3>Добавить студента</h3>
        <AddStudent onAdd={onAddHandler} />
      </div>
    </div>
  );
};

export default Students;