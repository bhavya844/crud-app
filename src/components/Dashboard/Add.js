import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleAdd = async e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date || !photo) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields including the photo are required.',
        showConfirmButton: true,
      });
    }

    try {
      // Convert the photo to a Base64 string
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Photo = reader.result.split(',')[1]; // Extract the Base64 part

        const payload = {
          firstName,
          lastName,
          email,
          salary: parseInt(salary, 10), // Ensure salary is a number
          date,
          photo: base64Photo, // Add Base64 photo
        };

        // Send POST request to Lambda using fetch
        const response = await fetch(
          'https://fxxbsr4tme.execute-api.us-east-1.amazonaws.com/addemployee',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload), // Pass the payload as JSON string
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON response

        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `User added successfully. Photo URL: ${data.photoUrl}`,
          showConfirmButton: true,
        });

        setIsAdding(false);
      };

      reader.readAsDataURL(photo); // Read the file as a Base64 string
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'An unexpected error occurred.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label htmlFor="photo">Upload Photo</label>
        <input
          id="photo"
          type="file"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
