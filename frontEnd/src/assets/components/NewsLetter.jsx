



export default function NewsLetter({createNewsletter,title,content,template,isLoading,newsletters,deleteNewsletter,setTitle,setContent,setTemplate}){


    return(
        <div className="space-y-10">
        {/* Create Newsletter Card */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            📝 Create a New Newsletter
          </h2>
          <form onSubmit={createNewsletter} className="space-y-5">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                ✏️ Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Weekly Update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">
                📄 Content
              </label>
              <textarea
                id="content"
                placeholder="Write the content of your newsletter..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white min-h-[160px]"
                required
              />
            </div>

            {/* Template Dropdown */}
            <div>
              <label htmlFor="template" className="block text-sm font-semibold text-gray-700 mb-1">
                🎨 Choose a Template
              </label>
              <select
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>Select a template</option>
                <option value="discount">💸 Discount</option>
                <option value="new_product">🆕 New Product</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2.5 px-6 rounded-xl shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "🚀 Create Newsletter"}
              </button>
            </div>
          </form>
        </div>

        {/* Your Newsletters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">📬 Your Newsletters</h2>
            <span className="text-sm text-gray-500">{newsletters.length} Total</span>
          </div>
          {newsletters.length === 0 ? (
            <p className="p-6 text-gray-500 italic">You haven’t created any newsletters yet.</p>
          ) : (
            <ul className="divide-y">
              {newsletters.map((newsletter) => (
                <li key={newsletter.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{newsletter.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {newsletter.template || "No template"}
                      </span>
                      <span>{new Date(newsletter.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => deleteNewsletter(newsletter.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    )
}
