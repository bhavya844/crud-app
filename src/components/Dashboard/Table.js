import React, { useState, useEffect } from 'react';

// Table component to display employee data
const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState([]);
  const [images, setImages] = useState([]);

  // Fetch employee data from the backend API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://fxxbsr4tme.execute-api.us-east-1.amazonaws.com/getAllEmployees');
        const data = await response.json();
        if (data && data.employees) {
          const filteredEmployees = data.employees.map(employee => {
            const { Id, photoUrl, ...rest } = employee;  // Exclude 'Id' and 'photoUrl'
            return rest;
          });
          setEmployees(filteredEmployees);
          setColumns(['FullName', 'Date', 'Salary', 'Email']);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch images from the API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://fxxbsr4tme.execute-api.us-east-1.amazonaws.com/getAllImages');
        const data = await response.json();
        if (data && data.photos) {
          setImages(data.photos);  // Store the photos array containing the presigned URLs
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="employee-container">
      <h2>See Our Employees</h2>
      
      {/* Display images */}
      <div className="employee-images">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image.url}  // Use the presigned URL
              alt={`Employee ${index + 1}`}
              style={{
                width: '200px',  // Larger width
                height: '200px', // Larger height
                objectFit: 'cover', // Maintain image aspect ratio while filling the space
                marginRight: '20px',  // Space between images
              }}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="contain-table">
        <table className="striped-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>FirstName LastName</th>
              <th>Date</th>
              <th>Salary</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{employee.firstName} {employee.lastName}</td>
                  <td>{employee.date}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Employees</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
