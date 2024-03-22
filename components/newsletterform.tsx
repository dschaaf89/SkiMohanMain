import React, { useState } from 'react';

interface NewsletterSignUpProps {
  onSubmit: (formData: { name: string; email: string; phone: string }) => void;
}

const NewsletterSignUp: React.FC<NewsletterSignUpProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' }); // Reset form data
  };

  return (
    <>
     
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </>
  );
};

export default NewsletterSignUp;
