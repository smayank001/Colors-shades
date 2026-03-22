import { useState, useEffect } from 'react';
import { API_URL } from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ 
    service_id: '', 
    title: '', 
    description: '', 
    price: '' 
  });

  const fetchData = async () => {
    try {
      const [coursesRes, servicesRes] = await Promise.all([
        fetch(`${API_URL}/courses`),
        fetch(`${API_URL}/services`)
      ]);
      const coursesData = await coursesRes.json();
      const servicesData = await servicesRes.json();
      
      setCourses(coursesData.data || []);
      setServices(servicesData.data || []);
      
      // Auto-select first service if available
      if (servicesData.data && servicesData.data.length > 0 && !formData.service_id) {
        setFormData(prev => ({ ...prev, service_id: servicesData.data[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!formData.service_id) return alert('Please create and select a service first.');

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ ...formData, title: '', description: '', price: '' });
        fetchData();
      } else {
        alert('Failed to add course');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete course');
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="space-y-8">
      {/* Add Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Add New Course</h3>
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Service</label>
              <select 
                required 
                className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
                value={formData.service_id} 
                onChange={e => setFormData({...formData, service_id: e.target.value})}
              >
                <option value="" disabled>Select a service</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title</label>
              <input type="text" required className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Price</label>
              <input type="text" placeholder="e.g. 99.99" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium transition-colors">Add Course</button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-medium text-gray-600 w-16">ID</th>
                <th className="p-4 font-medium text-gray-600">Title</th>
                <th className="p-4 font-medium text-gray-600">Service</th>
                <th className="p-4 font-medium text-gray-600">Price</th>
                <th className="p-4 font-medium text-gray-600 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading courses...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">No courses found.</td></tr>
              ) : (
                courses.map(c => {
                  const service = services.find(s => s.id === c.service_id);
                  return (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 text-gray-500">{c.id}</td>
                      <td className="p-4 font-medium text-gray-800">{c.title}</td>
                      <td className="p-4 text-gray-600">
                        <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs">{service ? service.title : c.service_id}</span>
                      </td>
                      <td className="p-4 text-gray-600">{c.price ? `$${c.price}` : '-'}</td>
                      <td className="p-4">
                        <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors">Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
