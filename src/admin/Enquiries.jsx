import { useState, useEffect } from 'react';
import { API_URL } from '../api';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/enquiries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-medium text-gray-800">Customer Enquiries</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-full">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-sm">
              <th className="p-4 font-medium text-gray-600">ID</th>
              <th className="p-4 font-medium text-gray-600">Date</th>
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Phone</th>
              <th className="p-4 font-medium text-gray-600 w-1/3">Message</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Loading enquiries...</td></tr>
            ) : enquiries.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">No enquiries found.</td></tr>
            ) : (
              enquiries.map(enq => (
                <tr key={enq.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">{enq.id}</td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{new Date(enq.created_at).toLocaleDateString()}</td>
                  <td className="p-4 font-medium text-gray-800 whitespace-nowrap">{enq.name}</td>
                  <td className="p-4 text-sm text-blue-600 whitespace-nowrap"><a href={`tel:${enq.phone}`}>{enq.phone}</a></td>
                  <td className="p-4 text-sm text-gray-700 whitespace-pre-wrap">{enq.message || <span className="text-gray-400 italic">No message provided</span>}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiries;
