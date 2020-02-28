import { createAction, createErrorAction } from "../../utils";
import uuid from "uuid/v4";

import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE
} from "../constants";

const createTaskRequest = createAction(CREATE_TASK_REQUEST);
const createTaskSuccess = createAction(CREATE_TASK_SUCCESS);
const createTaskFailure = createErrorAction(CREATE_TASK_FAILURE);

export const createTask = () => (dispatch, getState, api) => {
  dispatch(createTaskRequest());
  const id = uuid();
  const newTask = {
    id,
    text: "",
    lastModifiedDate: Date.now()
  };

  return api.createTask(newTask).then(
    data => {
      dispatch(createTaskSuccess(data));
      return id;
    },
    error => {
      dispatch(createTaskFailure(error));
      return false;
    }
  );
};
