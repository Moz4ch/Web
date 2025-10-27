import type StudentsInterface from '@/types/StudentsInterface';

export const getStudentsApi = async (): Promise<StudentsInterface[]> => {
  try {
    console.log('>>> getStudentsApi: Запрос к /api/students');
    const response = await fetch('/api/students');
    
    console.log('>>> getStudentsApi: Ответ получен, статус:', response.status);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentsInterface[];
    console.log('>>> getStudentsApi: Данные студентов:', students);
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi ERROR:', err);
    return [] as StudentsInterface[];
  }
};
