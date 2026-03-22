const Dashboard = () => {
  return (
    <div className="grid gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Welcome to your Admin Dashboard</h3>
        <p className="text-gray-600">
          This is your control panel. Use the sidebar navigation on the left to manage the contents of your website seamlessly.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {/* Quick Help Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Getting Started</h4>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            <li>Manage your Services and available Courses.</li>
            <li>Upload Galleries and Images in the Media section.</li>
            <li>Check any submitted Enquiries from customers.</li>
            <li>Upload and Manage QR codes for payments.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
