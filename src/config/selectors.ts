export const PLAYER_VIEW_CY = 'player-view';
export const BUILDER_VIEW_CY = 'builder-view';
export const ANALYTICS_VIEW_CY = 'analytics-view';
export const SETTINGS_VIEW_PANE_CY = 'settings-view-pane';
export const TABLE_VIEW_PANE_CY = 'table-view-pane';
export const TAB_SETTINGS_VIEW_CY = 'tab-settings-view';
export const TAB_TABLE_VIEW_CY = 'tab-table-view';

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;
