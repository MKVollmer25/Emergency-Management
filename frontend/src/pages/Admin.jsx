import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faToilet } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimneyCrack } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

function Admin() {
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
        <div className="grid grid-cols-3 grid-rows-2 gap-6">
          <a class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faWater} size="2x" color="#999999" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Flood Dashboard</h2>
              <p class="text-sm text-gray-600">Live flood incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faFire} size="2x" color="#FF7700" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Fire Dashboard</h2>
              <p class="text-sm text-gray-600">Live fire incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faDroplet} size="2x" color="#0000FF" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Water Dashboard</h2>
              <p class="text-sm text-gray-600">Live water incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faToilet} size="2x" color="#993333" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Sewer Dashboard</h2>
              <p class="text-sm text-gray-600">Live sewer incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faHouseChimneyCrack} size="2x" color="#000000" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Earthquake Dashboard</h2>
              <p class="text-sm text-gray-600">Live earthquake incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faCircleQuestion} size="2x" color="#555555" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Miscellaneous Dashboard</h2>
              <p class="text-sm text-gray-600">Live miscellaneous incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
        </div>
      </main>
    </>
  )
}

export default Admin
