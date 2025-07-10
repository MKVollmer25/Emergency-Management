function Dashboard() {
  const date = new Date()

  const date_options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const time_options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }

  const formatted_date = date.toLocaleDateString("en-US", date_options)
  const formatted_time = date.toLocaleTimeString("en-US", time_options)

  return (
    <>
      <header className="bg-blue-900 text-white shadow-md px-6 py-4 md:py-6">
        WIP
      </header>
      <div className="flex justify-between px-4 py-4">
        <div>{formatted_date}, {formatted_time}</div>
        <div>BUTTONS</div>
      </div>
      <main className="px-4 pb-16">
        <div>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded mb-6">
            <p className="text-lg font-semibold">Weather in San Francisco:</p>
            <p>Temperature: WIP</p>
            <p>Conditions: WIP</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow mb-6">
          <p class="text-lg font-semibold text-gray-700">Total Complaints Filed: WIP</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <a class="bg-white border-t-4 border-blue-600 rounded-2xl p-6 shadow hover:bg-blue-50">
            <h3 class="text-lg font-bold text-blue-700 mb-2">File a New Complaint</h3>
            <p class="text-gray-600">Report emergencies quickly and easily.</p>
          </a>
          <a class="bg-white border-t-4 border-green-600 rounded-2xl p-6 shadow hover:bg-green-50">
            <h3 class="text-lg font-bold text-green-700 mb-2">View Your Complaints</h3>
            <p class="text-gray-600">Track the status of your past complaints and get updates.</p>
          </a>
        </div>
      </main>
    </>
  )
}

export default Dashboard
