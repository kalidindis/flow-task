import { updateColumn } from "../actions";
import { getColumnByTaskId, getDoneColumn } from "../selectors";

export const createCompleteTaskAction = updateColumnAction => taskId => (
  dispatch,
  getState,
  api
) => {
  const taskColumn = getColumnByTaskId(getState(), taskId);
  const doneColumn = getDoneColumn(getState());

  if (taskColumn && doneColumn) {
    taskColumn.tasks.splice(taskColumn.tasks.indexOf(taskId), 1);
    doneColumn.tasks.push(taskId);

    return dispatch(updateColumnAction(taskColumn.id, taskColumn)).then(() =>
      dispatch(updateColumnAction(doneColumn.id, doneColumn))
    );
  }
  return false;
};

export const completeTask = createCompleteTaskAction(updateColumn);
