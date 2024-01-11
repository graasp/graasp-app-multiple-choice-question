import { useEffect, useState } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';

import {
  AppDataType,
  UserAnswerAppData,
  getDefaultUserAnswerAppData,
} from '@/config/appData';
import { hooks, mutations } from '@/config/queryClient';
import { UserAnswer } from '@/interfaces/userAnswer';

const useUserAnswer = (): {
  userAnswer?: UserAnswer;
  submitAnswer: (userAnswer: UserAnswer) => void;
} => {
  const { data, isSuccess } = hooks.useAppData();
  const [userAnswerAppData, setUserAnswerData] = useState<UserAnswerAppData>();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();

  const { memberId } = useLocalContext();

  useEffect(() => {
    if (isSuccess) {
      setUserAnswerData(
        data.find(
          (d) => d.type === AppDataType.UserAnswer && d.member.id === memberId,
        ) as UserAnswerAppData,
      );
    }
  }, [isSuccess, data, memberId]);

  const submitAnswer = (userAnswer: UserAnswer): void => {
    if (userAnswerAppData?.id) {
      patchAppData({
        ...userAnswerAppData,
        data: userAnswer,
      });
    } else {
      postAppData(getDefaultUserAnswerAppData(userAnswer));
    }
  };
  return { userAnswer: userAnswerAppData?.data, submitAnswer };
};

export default useUserAnswer;
