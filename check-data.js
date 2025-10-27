const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'db', 'vki-web.db');
console.log('Проверяем базу данных по пути:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключение к базе данных успешно');
});

// Проверяем таблицы
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('Ошибка при получении списка таблиц:', err);
    db.close();
    return;
  }
  
  console.log('Таблицы в базе данных:');
  tables.forEach(table => console.log('-', table.name));
  
  // Проверяем содержимое таблицы student
  db.all("SELECT * FROM student", (err, students) => {
    if (err) {
      console.error('Ошибка при получении студентов:', err);
    } else {
      console.log('\nСтуденты в базе данных:');
      if (students.length === 0) {
        console.log('Студенты не найдены');
      } else {
        students.forEach(student => console.log('-', student));
      }
    }
    
    // Проверяем содержимое таблицы group (если есть)
    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%group%'", (err, groupTables) => {
      if (err) {
        console.error('Ошибка при поиске таблиц групп:', err);
        db.close();
        return;
      }
      
      if (groupTables.length > 0) {
        const tableName = groupTables[0].name;
        console.log(`\nПроверяем таблицу ${tableName}:`);
        
        db.all(`SELECT * FROM ${tableName}`, (err, groups) => {
          if (err) {
            console.error('Ошибка при получении групп:', err);
          } else {
            if (groups.length === 0) {
              console.log('Группы не найдены');
            } else {
              groups.forEach(group => console.log('-', group));
            }
          }
          db.close();
        });
      } else {
        console.log('\nТаблицы групп не найдены');
        db.close();
      }
    });
  });
});
