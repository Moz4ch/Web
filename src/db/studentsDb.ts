import sqlite3 from 'sqlite3';

import type StudentsInterface from '@/types/StudentsInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentsInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const groups = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM class';
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

  // test data
  // const groups: GroupInterface[] = [
  //   {
  //     name: '2207 д2',
  //   },
  //   {
  //     name: '2207 д2',
  //   },
  // ];

  return groups as StudentsInterface[];
};
