import sqlite3 from 'sqlite3';

import type StudentsInterface from '@/types/StudentsInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentsInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });


  return students as StudentsInterface[];
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