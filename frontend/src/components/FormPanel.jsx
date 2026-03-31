import { useSelector } from "react-redux";

export default function FormPanel() {
  const data = useSelector((state) => state.interaction);

  return (
    <div className="p-5 space-y-6 bg-gray-50 h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold">Log HCP Interaction</h2>

      {/* Interaction Details */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Interaction Details</h3>

        <input value={data.hcp_name} placeholder="HCP Name" disabled className="input" />

        <div className="flex gap-2">
          <input value={data.date} placeholder="Date" disabled className="input w-1/2" />
          <input value={data.time} placeholder="Time" disabled className="input w-1/2" />
        </div>

        <input
          value={data.interaction_type}
          placeholder="Interaction Type (Meeting / Call)"
          disabled
          className="input"
        />

        <input value={data.attendees} placeholder="Attendees" disabled className="input" />

        <textarea
          value={data.topics}
          placeholder="Topics Discussed"
          disabled
          className="input"
        />
      </div>

      {/* Materials Section */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Materials / Samples</h3>

        <input
          value={data.materials_shared}
          placeholder="Materials Shared (e.g., Brochure)"
          disabled
          className="input"
        />

        <input
          value={data.samples}
          placeholder="Samples Distributed"
          disabled
          className="input"
        />
      </div>

      {/* Sentiment Section */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">HCP Sentiment</h3>

        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              checked={data.sentiment === "positive"}
              readOnly
            />{" "}
            Positive
          </label>

          <label>
            <input
              type="radio"
              checked={data.sentiment === "neutral"}
              readOnly
            />{" "}
            Neutral
          </label>

          <label>
            <input
              type="radio"
              checked={data.sentiment === "negative"}
              readOnly
            />{" "}
            Negative
          </label>
        </div>
      </div>

      {/* Outcomes */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Outcomes</h3>

        <textarea
          value={data.outcomes}
          placeholder="Key outcomes or agreements"
          disabled
          className="input"
        />
      </div>

      {/* Follow-up */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Follow-up Actions</h3>

        <textarea
          value={data.follow_up}
          placeholder="Next steps or tasks"
          disabled
          className="input"
        />
      </div>
    </div>
  );
}