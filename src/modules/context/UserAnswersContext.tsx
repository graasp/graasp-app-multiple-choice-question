import {
  FC,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import {
  AppDataType,
  UserAnswerAppData,
  getDefaultUserAnswerAppData,
} from '@/config/appData';
import { hooks, mutations } from '@/config/queryClient';
import { UserAnswer } from '@/interfaces/userAnswer';

type UserAnswersContextType = {
  userAnswer?: UserAnswer;
  submitAnswer: (userAnswer: UserAnswer) => void;
  deleteAnswer: (id?: UserAnswerAppData['id']) => void;
  allAnswersAppData?: UserAnswerAppData[];
};

const defaultContextValue: UserAnswersContextType = {
  submitAnswer: () => null,
  deleteAnswer: () => null,
};

const UserAnswersContext =
  createContext<UserAnswersContextType>(defaultContextValue);

export const UserAnswersProvider: FC<{
  children: ReactElement | ReactElement[];
}> = ({ children }) => {
  const { data, isSuccess } = hooks.useAppData();
  const [userAnswerAppData, setUserAnswerData] = useState<UserAnswerAppData>();
  const [allAnswersAppData, setAllAnswersAppData] =
    useState<UserAnswerAppData[]>();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();
  const { mutate: deleteAppData } = mutations.useDeleteAppData();
  const { permission } = useLocalContext();

  const isAdmin = useMemo(
    () => PermissionLevelCompare.gte(permission, PermissionLevel.Admin),
    [permission],
  );

  const { memberId } = useLocalContext();

  useEffect(() => {
    if (isSuccess) {
      const allAns = data.filter(
        (d) => d.type === AppDataType.UserAnswer,
      ) as UserAnswerAppData[];
      setAllAnswersAppData(allAns);
      setUserAnswerData(
        allAns.find((d) => d.member.id === memberId) as UserAnswerAppData,
      );
    }
  }, [isSuccess, data, memberId]);

  const submitAnswer = useMemo(
    () =>
      (userAnswer: UserAnswer): void => {
        if (userAnswerAppData?.id) {
          patchAppData({
            ...userAnswerAppData,
            data: userAnswer,
          });
        } else {
          postAppData(getDefaultUserAnswerAppData(userAnswer));
        }
      },
    [patchAppData, postAppData, userAnswerAppData],
  );

  const deleteAnswer = useMemo(
    () =>
      (id?: UserAnswerAppData['id']): void => {
        if (id) {
          deleteAppData({ id });
        } else if (userAnswerAppData) {
          deleteAppData({ id: userAnswerAppData?.id });
        }
      },
    [deleteAppData, userAnswerAppData],
  );
  const contextValue = useMemo(
    () => ({
      userAnswer: userAnswerAppData?.data,
      submitAnswer,
      allAnswersAppData: isAdmin ? allAnswersAppData : undefined,
      deleteAnswer,
    }),
    [allAnswersAppData, deleteAnswer, isAdmin, submitAnswer, userAnswerAppData],
  );

  return (
    <UserAnswersContext.Provider value={contextValue}>
      {children}
    </UserAnswersContext.Provider>
  );
};

const useUserAnswers = (): UserAnswersContextType =>
  useContext(UserAnswersContext);

export default useUserAnswers;
