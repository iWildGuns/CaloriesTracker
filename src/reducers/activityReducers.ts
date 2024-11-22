import { Activity } from "../types";

export type ActivityActions =
  | { type: "saveActivity"; payload: { newActicity: Activity } }
  | { type: "setActiveId"; payload: { id: Activity["id"] } }
  | { type: "deleteActivity"; payload: { id: Activity["id"] } }
  | { type: "restartApp" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
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

  try {
    if (action.type === "deleteActivity") {
      return {
        // ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload.id
        ),
      };
    }
  } catch (error) {
    console.log(error);
  }

  if (action.type === "restartApp") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
