'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <div key={group.id} className={styles.groupCard}>
          <h2>
            {group.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Groups;
