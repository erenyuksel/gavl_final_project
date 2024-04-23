import { useState } from 'react';

const AddNewProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('Company Name:', companyName);
    console.log('Description:', description);
    console.log('Logo:', logo);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-gray-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Add New Contestant
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Contestant
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            htmlFor="companyName"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="logo"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Logo
                          </label>
                          <input
                            type="file"
                            id="logo"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setLogo(e.target.files[0])}
                            required
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewProject;
