import { useReservableSchedules } from '@/services/schedule';
import {
  Divider, DotLoading, Selector, Skeleton, Tabs,
} from 'antd-mobile';
import { useGetValidStudentCardsByCourse } from '@/services/student-card';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getWeekdayZh } from '@/types/course';
import styles from './reserve.module.less';
import { StudentCard } from './card';

interface IProps {
  courseId: string;
  onClose: () => void;
}

export const Reserve = ({ courseId, onClose }: IProps) => {
  const { loading, reservableSchedules } = useReservableSchedules(courseId);
  const {
    loading: cardsLoading,
    validStudentCardsByCourse,
  } = useGetValidStudentCardsByCourse(courseId);

  const [schedules, setSchedules] = useState<string[]>([]);
  const [cards, setCards] = useState<string[]>([]);

  const weekdays = useMemo(() => {
    const wds = [];
    const now = dayjs();
    for (let i = 1; i <= 7; i += 1) {
      const day = now.add(i, 'day');
      const value = day.format('dddd').toLowerCase();
      const label = getWeekdayZh(value);
      const sameDaySchedules = reservableSchedules?.filter((schedule) => day.isSame(schedule.date, 'day'));
      if (sameDaySchedules.length > 0) {
        const options = sameDaySchedules?.map((schedule) => ({
          label: `${schedule.start.slice(0, 5)}-${schedule.end.slice(0, 5)}`,
          value: schedule.id,
        }));
        wds.push({
          disabled: false,
          label,
          value,
          options,
        });
      } else {
        wds.push({
          disabled: true,
          label,
          value,
          options: [],
        });
      }
    }
    return wds;
  }, [reservableSchedules]);

  const memoCards = useMemo(() => validStudentCardsByCourse?.map((card) => ({
    label: <StudentCard card={card} />,
    value: card.id,
  })), [validStudentCardsByCourse]);

  if (loading || cardsLoading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Divider>请选择预约时间</Divider>
      <Tabs>
        {
          weekdays.map((week) => (
            <Tabs.Tab title={week.label} key={week.value} disabled={week.disabled}>
              <Selector
                columns={2}
                options={week.options}
                onChange={(v) => setSchedules(v)}
              />
            </Tabs.Tab>
          ))
        }
      </Tabs>
      <Divider>请选择消费卡</Divider>
      <Selector
        columns={1}
        onChange={(v) => setCards(v)}
        options={memoCards}
      />
    </div>
  );
};
