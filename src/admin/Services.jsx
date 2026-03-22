// import { useState, useEffect } from 'react';

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({ title: '', description: '', image_url: '' });

//   const fetchServices = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/services');
//       const data = await res.json();
//       setServices(data.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const handleAddService = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('adminToken');
//       const res = await fetch('http://localhost:5000/services', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });
//       if (res.ok) {
//         setFormData({ title: '', description: '', image_url: '' });
//         fetchServices();
//       } else {
//         alert('Failed to add service. Check console for details.');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this service?')) return;
//     try {
//       const token = localStorage.getItem('adminToken');
//       const res = await fetch(`http://localhost:5000/services/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (res.ok) {
//         fetchServices();
//       } else {
//         alert('Failed to delete service');
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Add Form */}
//       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//         <h3 className="text-lg font-medium mb-4">Add New Service</h3>
//         <form onSubmit={handleAddService} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Name (Title)</label>
//               <input type="text" required className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Image URL</label>
//               <input type="text" className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Description</label>
//             <textarea required className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
//           </div>
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium transition-colors">Add Service</button>
//         </form>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 border-b">
//                 <th className="p-4 font-medium text-gray-600 w-16">ID</th>
//                 <th className="p-4 font-medium text-gray-600">Title</th>
//                 <th className="p-4 font-medium text-gray-600">Description</th>
//                 <th className="p-4 font-medium text-gray-600 w-24">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="4" className="p-4 text-center text-gray-500">Loading services...</td></tr>
//               ) : services.length === 0 ? (
//                 <tr><td colSpan="4" className="p-4 text-center text-gray-500">No services found.</td></tr>
//               ) : (
//                 services.map(s => (
//                   <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
//                     <td className="p-4 text-gray-500">{s.id}</td>
//                     <td className="p-4 font-medium text-gray-800">{s.title}</td>
//                     <td className="p-4 text-gray-600 max-w-md truncate">{s.description}</td>
//                     <td className="p-4">
//                       <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors">Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;


import { useState, useEffect } from 'react';
import { API_URL } from '../api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    icon: ''
  });

  // 🔥 Auto slug generator
  const generateSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, '-');

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      setServices(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add service
  const handleAddService = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('admin_token');

      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });


      if (res.ok) {
        setFormData({
          name: '',
          slug: '',
          description: '',
          price: '',
          icon: ''
        });
        fetchServices();
      } else {
        alert('Failed to add service');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const token = localStorage.getItem('admin_token');

      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });


      if (res.ok) fetchServices();
      else alert('Delete failed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">

      {/* 🔥 ADD SERVICE FORM */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Add New Service</h3>

      <form onSubmit={handleAddService} className="space-y-4">

  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Service Name"
      required
      value={formData.name}
      onChange={(e) => {
        const name = e.target.value;
        setFormData({
          ...formData,
          name,
          slug: generateSlug(name)
        });
      }}
    />

    <input
      type="text"
      placeholder="Slug"
      value={formData.slug}
      onChange={(e) =>
        setFormData({ ...formData, slug: e.target.value })
      }
    />
  </div>

  <textarea
    placeholder="Description"
    required
    value={formData.description}
    onChange={(e) =>
      setFormData({ ...formData, description: e.target.value })
    }
  />

  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Price (From ₹2500 / month)"
      value={formData.price}
      onChange={(e) =>
        setFormData({ ...formData, price: e.target.value })
      }
    />

    <select
      value={formData.icon}
      onChange={(e) =>
        setFormData({ ...formData, icon: e.target.value })
      }
    >
      <option value="">Select Icon</option>
      <option value="palette">🎨 Painting</option>
      <option value="chess">♟ Chess</option>
      <option value="books">📚 Study</option>
    </select>
  </div>

  <button type="submit">Save</button>
</form>
      </div>

      {/* 🔥 SERVICES TABLE */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Price</th>
              <th className="p-4">Icon</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No services found
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-4">{s.id}</td>
                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4">{s.slug}</td>
                  <td className="p-4 text-red-500">{s.price}</td>
                  <td className="p-4">{s.icon}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
