import sqlite3 from 'sqlite3';

import type StudentsInterface from '@/types/StudentsInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentsInterface[]> => {
  const dbPath = process.env.DB ?? './db/vki-web.db';
  console.log('>>> getStudentsDb: Путь к базе данных:', dbPath);
  
  const db = new sqlite3.Database(dbPath);

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    console.log('>>> getStudentsDb: Выполняем SQL запрос:', sql);
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log('>>> getStudentsDb ERROR:', err);
        reject(err);
        db.close();
        return;
      }
      console.log('>>> getStudentsDb: Результат запроса:', rows);
      resolve(rows);
      db.close();
    });
  });

  console.log('>>> getStudentsDb: Возвращаем студентов:', students);
  return students as StudentsInterface[];
};

export const addStudentDb = async (studentData: Omit<StudentsInterface, 'id'>): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const newId = await new Promise((resolve, reject) => {
    const sql = 'INSERT INTO student (first_name, last_name, middle_name, groupId) VALUES (?, ?, ?, ?)';
    db.run(sql, [studentData.first_name, studentData.last_name, studentData.middle_name, studentData.groupId], function(err) {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(this.lastID);
      db.close();
    });
  });

  return newId as number;
};

export const deleteStudentDb = async (id: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const deletedId = await new Promise((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function(err) {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(this.lastID);
      db.close();
    });
  });

  return deletedId as number;
};