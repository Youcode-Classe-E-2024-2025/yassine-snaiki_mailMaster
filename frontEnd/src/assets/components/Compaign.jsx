


export default function Campaign({newsletters,newsletterId,subject,createCampaign,isLoading,campaigns,deleteCampaign,setSubject,setNewsletterId,runCampaign,campaignId,selectedSubs,setSelectedSubs,subscribers ,setCampaignId}) {


return (
<div className="space-y-10">
  {/* Forms Row */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Create Campaign Card */}
    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-8 border border-indigo-100">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        🆕 Create Campaign
      </h2>
      <form onSubmit={createCampaign} className="space-y-5">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject Line
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Email subject line"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full border border-indigo-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label htmlFor="newsletterId" className="block text-sm font-medium text-gray-700 mb-1">
            Newsletter
          </label>
          <select
            id="newsletterId"
            value={newsletterId}
            onChange={e => setNewsletterId(e.target.value)}
            className="w-full border border-indigo-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="" disabled>
              Select a newsletter
            </option>
            {newsletters.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition"
        >
          {isLoading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>

    {/* Run Campaign Card */}
    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 border border-green-100">
      <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
        🚀 Run Campaign
      </h2>
      <form onSubmit={runCampaign} className="space-y-5">
        <div>
          <label htmlFor="campaignId" className="block text-sm font-medium text-gray-700 mb-1">
            Campaign
          </label>
          <select
            id="campaignId"
            value={campaignId}
            onChange={e => setCampaignId(e.target.value)}
            className="w-full border border-green-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="" disabled>
              Select a campaign
            </option>
            {campaigns.map(({ id, subject }) => (
              <option key={id} value={id}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Enhanced Subscriber Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subscribers
          </label>
          <div className="border border-green-200 rounded-xl p-3 bg-white max-h-56 overflow-y-auto shadow-inner">
            {subscribers.map(({ id, name, email }) => (
              <label
                key={id}
                className="flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md transition"
              >
                <input
                  type="checkbox"
                  value={id}
                  checked={selectedSubs.includes(id)}
                  onChange={e => {
                    const updated = e.target.checked
                      ? [...selectedSubs, id]
                      : selectedSubs.filter(sid => sid !== id);
                    setSelectedSubs(updated);
                  }}
                  className="accent-green-600"
                />
                <span className="text-gray-800 text-sm">
                  {name} <span className="text-gray-500 text-xs">({email})</span>
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Click to select one or more subscribers
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition"
        >
          {isLoading ? "Launching..." : "Launch Campaign"}
        </button>
      </form>
    </div>
  </div>

  {/* Campaigns List */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <h2 className="text-xl font-semibold p-6 border-b bg-gray-50">Your Campaigns</h2>
    {campaigns.length === 0 ? (
      <p className="p-6 text-gray-500 italic">No campaigns created yet.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              {["Subject", "Status", "Newsletter", "Created", "Actions"].map(col => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map(({ id, subject, status, newsletter_id, created_at }) => (
              <tr key={id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      status === "ongoing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {newsletters.find(n => n.id === newsletter_id)?.title || "Unknown"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => deleteCampaign(id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

)
}
