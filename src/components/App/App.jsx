import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import { useEffect, useState } from "react";
import Notification from "../Notification/Notification";
import css from "./App.module.css";

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const saveFeedback = localStorage.getItem("feedback");
    return saveFeedback
      ? JSON.parse(saveFeedback)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });

  const total = feedback.good + feedback.neutral + feedback.bad;
  const positive = Math.round((feedback.good / total) * 100);
  const updateFeedback = (type) => {
    setFeedback({ ...feedback, [type]: feedback[type] + 1 });
  };

  const reset = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className={css.container}>
      <Description />
      <Options updateFeedback={updateFeedback} reset={reset} total={total} />
      {total > 0 ? (
        <Feedback feedback={feedback} total={total} positive={positive} />
      ) : (
        <Notification />
      )}
    </div>
  );
}
