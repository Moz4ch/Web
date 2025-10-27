import { getStudentsDb, addStudentDb } from '@/db/studentsDb';
import type StudentsInterface from '@/types/StudentsInterface';

export async function GET(): Promise<Response> {
  console.log('>>> API GET /api/students: Получение студентов из базы данных');
  const students = await getStudentsDb();
  console.log('>>> API GET /api/students: Найдено студентов:', students.length);
  console.log('>>> API GET /api/students: Данные студентов:', students);

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json() as Omit<StudentsInterface, 'id'>;
    
    // Валидация данных
    if (!body.first_name || !body.last_name || !body.middle_name || !body.groupId) {
      return new Response(JSON.stringify({ error: 'Все поля обязательны для заполнения' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const newId = await addStudentDb(body);

    return new Response(JSON.stringify({ id: newId, ...body }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка при добавлении студента:', error);
    return new Response(JSON.stringify({ error: 'Ошибка при добавлении студента' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
