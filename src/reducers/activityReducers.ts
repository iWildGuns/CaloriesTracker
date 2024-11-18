import { Activity } from "../types";

export type ActivityActions =
  | { type: "saveActivity"; payload: { newActicity: Activity } }
  | { type: "setActiveId"; payload: { id: Activity["id"] } };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const initialState: ActivityState = {
  activities: [],
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "saveActivity") {
    // este codigo maneja la logica para actualizar el state
    let updateActivities: Activity[] = [];
    if (state.activeId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActicity : activity
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActicity];
    }
    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }

  if (action.type === "setActiveId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  return state;
};
