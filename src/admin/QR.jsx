import { useState, useEffect } from 'react';

const QR = () => {
  const [qrList, setQrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', file: null });

  const fetchQR = async () => {
    try {
      const res = await fetch('http://localhost:5000/qr');
      const data = await res.json();
      setQrList(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert('Please select a file');

    setUploadLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formPayload = new FormData();
      formPayload.append('file', formData.file);
      formPayload.append('name', formData.name);

      const res = await fetch('http://localhost:5000/qr', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formPayload
      });
      
      if (res.ok) {
        setFormData({ name: '', file: null });
        const fileInput = document.getElementById('qrFileInput');
        if (fileInput) fileInput.value = '';
        fetchQR();
      } else {
        const errorData = await res.json();
        alert(`Failed to upload QR: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Upload New QR Code</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name / Identifier</label>
              <input 
                type="text" 
                required 
                placeholder="e.g., PayTM, PayPal, Class Fees"
                className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">QR Image File</label>
              <input 
                id="qrFileInput"
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
            {uploadLoading ? 'Uploading...' : 'Upload QR Code'}
          </button>
        </form>
      </div>

      {/* QR List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">QR Codes List</h3>
          <span className="text-sm text-gray-500">{qrList.length} items</span>
        </div>
        
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading QR Codes...</p>
          ) : qrList.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No QR codes found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {qrList.map(item => (
                <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow flex flex-col items-center bg-white">
                  <div className="p-4 bg-gray-50 w-full flex justify-center border-b">
                     <img src={item.url} alt={item.name} className="w-32 h-32 object-contain" />
                  </div>
                  <div className="p-3 w-full text-center">
                    <span className="text-sm font-semibold text-gray-800 block truncate" title={item.name}>{item.name}</span>
                    <span className="text-xs text-gray-500 font-mono mt-1 block">ID: {item.id}</span>
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

export default QR;
