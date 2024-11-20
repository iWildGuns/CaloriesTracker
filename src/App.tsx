import { useEffect, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activityReducers";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import CaloryTracker from "./components/CaloriesTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = state.activities.length > 0;

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calories Tracker
          </h1>
          <button
            className=" bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restartApp" })}
          >
            Restart App
          </button>
        </div>
      </header>
      <section className=" bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 p-10">
        <div className=" max-w-4xl mx-auto">
          <CaloryTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
