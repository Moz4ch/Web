import { useQuery } from '@tanstack/react-query';
import { getStudentsApi } from '@/api/studentsApi';
import type StudentsInterface from '@/types/StudentsInterface';

interface StudentsHookInterface {
  students: StudentsInterface[];
  isLoading: boolean;
  error: Error | null;
}

const useStudents = (): StudentsHookInterface => {
  // const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
  });

  return {
    students: data ?? [],
    isLoading,
    error,
  };
};

export default useStudents;
