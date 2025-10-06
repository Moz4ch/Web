import { useQuery } from '@tanstack/react-query';
import { getGroupsApi } from '@/api/groupsApi';
import type GroupInterface from '@/types/GroupInterface';

interface GroupsHookInterface {
  groups: GroupInterface[];
  isLoading: boolean;
  error: Error | null;
}

const useGroups = (): GroupsHookInterface => {
  // const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroupsApi(),
  });

  return {
    groups: data ?? [],
    isLoading,
    error,
  };
};

export default useGroups;
