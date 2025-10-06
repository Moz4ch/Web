'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups, isLoading, error } = useGroups();

  if (isLoading) {
    return (
      <div className={styles.Groups}>
        <p>Загрузка групп...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.Groups}>
        <p>Ошибка загрузки групп: {error.message}</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className={styles.Groups}>
        <p>Группы не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <h2 key={group.id}>
          {group.name}
        </h2>
      ))}
    </div>
  );
};

export default Groups;
