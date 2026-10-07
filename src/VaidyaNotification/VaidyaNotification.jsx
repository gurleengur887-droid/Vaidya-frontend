import "./VaidyaNotification.css";

export default function VaidyaNotification({
  show,
  title = "Vaidya Co.",
  message,
  type = "error",
  onClose
}) {
  if (!show) return null;

  return (
    <div className="vaidya-notification-overlay">

      <div className={`vaidya-notification ${type}`}>

        <div className="vaidya-notification-logo">
          🌿
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <button onClick={onClose}>
          OK
        </button>

      </div>

    </div>
  );
}