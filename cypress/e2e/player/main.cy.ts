import { Context, PermissionLevel } from '@graasp/sdk';

import {
  MCQ_QUESTION_CY,
  buildDataCy,
  makeMcqAnswersCy,
} from '../../../src/config/selectors';
import { ANSWERS_SETTING, QUESTION_SETTING } from '../../fixtures/appSettings';

describe('Player View configured', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [QUESTION_SETTING, ANSWERS_SETTING],
      },
      {
        context: Context.Player,
        permission: PermissionLevel.Read,
      },
    );
    cy.visit(`/`);
  });

  it('test question and answers are visible', () => {
    const { answers } = ANSWERS_SETTING.data;
    answers.forEach((ans, index) => {
      cy.get(buildDataCy(makeMcqAnswersCy(index))).should('be.visible');
    });

    cy.get(buildDataCy(MCQ_QUESTION_CY)).should('be.visible');
  });
});
