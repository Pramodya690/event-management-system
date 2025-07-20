import { useState } from "react";
import axios from "axios";

const Marketing = () => {
  const [description, setDescription] = useState("");
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post("http://localhost:5000/send-emails", {
        emails,
        description, // if you modify backend to receive description dynamically
      });

      setStatus("✅ Emails sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Email Generator</h1>

      <textarea
        rows={4}
        placeholder="Describe what kind of email you want (e.g. 'Request catering for wedding...')"
        className="w-full border p-3 mb-4 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter recipient emails (comma separated)"
        className="w-full border p-3 mb-4 rounded"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />

      <button
        onClick={handleSend}
        disabled={loading || !description || !emails}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Generate & Send Email"}
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default Marketing;
