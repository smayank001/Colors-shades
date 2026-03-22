import { useState, useEffect } from 'react';

const Media = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [formData, setFormData] = useState({ 
    category: 'gallery', 
    file: null 
  });

  const fetchMedia = async (category = '') => {
    setLoading(true);
    try {
      const url = category ? `http://localhost:5000/media?category=${category}` : 'http://localhost:5000/media';
      const res = await fetch(url);
      const data = await res.json();
      setMediaList(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(categoryFilter);
  }, [categoryFilter]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert('Please select a file');

    setUploadLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formPayload = new FormData();
      formPayload.append('file', formData.file);
      formPayload.append('category', formData.category);

      const res = await fetch('http://localhost:5000/media', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formPayload
      });
      
      if (res.ok) {
        setFormData({ ...formData, file: null });
        // Reset file input element
        const fileInput = document.getElementById('mediaFileInput');
        if(fileInput) fileInput.value = '';
        fetchMedia(categoryFilter);
      } else {
        const errorData = await res.json();
        alert(`Failed to upload media: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media file?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/media/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchMedia(categoryFilter);
      } else {
        alert('Failed to delete media');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Upload Media</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Category</label>
              <select 
                className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="events">Events</option>
                <option value="student_work">Student Work</option>
                <option value="achievements">Achievements</option>
                <option value="gallery">Gallery</option>
                <option value="banners">Banners</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">File Image/Video</label>
              <input 
                id="mediaFileInput"
                type="file" 
                required 
                className="w-full border p-1 rounded focus:ring-blue-500 focus:border-blue-500" 
                onChange={e => setFormData({...formData, file: e.target.files[0]})} 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={uploadLoading}
            className={`px-4 py-2 rounded text-white font-medium text-sm transition-colors ${uploadLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {uploadLoading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>

      {/* Filter and List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-medium text-gray-800">Media Library</h3>
          <select 
            className="border p-2 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="events">Events</option>
            <option value="student_work">Student Work</option>
            <option value="achievements">Achievements</option>
            <option value="gallery">Gallery</option>
            <option value="banners">Banners</option>
          </select>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading media...</p>
          ) : mediaList.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No media found for the selected category.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaList.map(item => (
                <div key={item.id} className="relative group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={item.url} alt={item.file_name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity"></div>
                  <div className="p-3 bg-white flex flex-col justify-between items-start border-t">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded inline-block mb-2">{item.category}</span>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 text-xs font-medium hover:text-red-700 transition-colors w-full text-left"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;
