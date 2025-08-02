import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../components/API';

function NewReport() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const handlePhone = (e) => {
    const input = e.target.value;
    const filtered = input.replace(/[^0-9]/g, '');
    setPhone(filtered);
  };

  const severityFilter = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  }

  const handleSeverity = (e) => {
    const val = e.target.value;
    if (val === "") {
      setSeverity("");
    } else {
      const num = Number(val);
      if (!isNaN(num) && Number.isInteger(num) && num >= 1 && num <= 5) {
        setSeverity(num);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raw_date = new Date();
    const date = raw_date.toISOString().slice(0, 19).replace('T', ' ');
    const status = "Open";

    let latitude = null;
    let longitude = null;
    let zipcode = '';
    
    setInProgress(true)
    if (inProgress) {
      console.log("Duplicate report")
      return
    }

    try {
      // Geocode only on submit
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location + ', San Francisco, CA')}`);
      const data = await response.json();
      if (name == "") {
        console.log("Missing name")
        setInProgress(false)
        return
      }
      if (phone == "") {
        console.log("Missing phone")
        setInProgress(false)
        return
      }
      if (category == "") {
        console.log("Missing category")
        setInProgress(false)
        return
      }
      if (severity == "") {
        console.log("Missing severity")
        setInProgress(false)
        return
      }
      if (description == "") {
        console.log("Missing description")
        setInProgress(false)
        return
      }
      if (location == "") {
        console.log("Missing location")
        setInProgress(false)
        return
      }
      if (data && data.length > 0) {
        latitude = data[0].lat;
        longitude = data[0].lon;
        console.log("Geocode: " + latitude + ", " + longitude)

        try {
          const reverseRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const reverseData = await reverseRes.json();
          zipcode = reverseData.address?.postcode || '';
          console.log(zipcode)
        } catch (reverseErr) {
          console.warn("Reverse geocoding failed:", reverseErr);
        }
      } else {
        console.warn("Geocoding: no results found.");
        return
      }
    } catch (geoErr) {
      console.error("Geocoding failed: ", geoErr);
    }

    try {
      await API.post('/post_data', {
        name,
        phone,
        category,
        severity,
        location,
        zipcode,
        latitude,
        longitude,
        date,
        description,
        status
      });
      setSubmitted(true);
      console.log("Submission successful");
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
      console.log("Submission failed");
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
          <p>Report Submitted</p>
          <Link to="/dashboard" className="hover:underline">Back</Link>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
          <Link to="/dashboard" className="hover:underline">Back</Link>
          <div className="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
            <h1 className="text-center font-bold text-2xl">
              File New Report
            </h1>
            <div>
              <label className="block text-sm font-semibold">Name</label>
              <input className="w-full px-4 py-2 border rounded"
                name="user"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div>
              <label className="block text-sm font-semibold">Phone Number</label>
              <input className="w-full px-4 py-2 border rounded"
                name="phone"
                value={phone}
                onChange={handlePhone}
                required />
            </div>
            <div>
              <label className="block text-sm font-semibold">Category</label>
              <select className="w-full px-4 py-2 border rounded"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required>
                <option value="">---Select---</option>
                <option value="Flood">Flood</option>
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Sewer">Sewer</option>
                <option value="Electrical">Electrical</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Severity</label>
              <input className="w-full px-4 py-2 border rounded"
                name="severity"
                type="number"
                min="1"
                max="5"
                step="1"
                value={severity}
                onChange={handleSeverity}
                onKeyDown={severityFilter}
                required />
            </div>
            <div>
              <label className="block text-sm font-semibold">Description</label>
              <textarea className="w-full px-4 py-2 border rounded"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required />
            </div>
            <div>
              <label className="block text-sm font-semibold">Location (1st line of address or nearest address)</label>
              <input className="w-full px-4 py-2 border rounded"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required />
            </div>
            <div>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit} disabled={inProgress}>
                {inProgress ? "Submitting..." : "Submit"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewReport;
