import React, { useState, ChangeEvent, FormEvent } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/sendContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle success
        alert('Email sent successfully!');
        // Reset form or handle UI changes as needed
      } else {
        // Handle errors
        console.error(data.message);
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('There was an error sending the email', error);
      alert('Failed to send email. Please check your connection.');
    }
  };
  // Placeholder for the CAPTCHA integration
  const CaptchaPlaceholder = () => (
    <div>
      {/* Here you would integrate a CAPTCHA component, for example, reCAPTCHA */}
      <p>CAPTCHA Placeholder</p>
    </div>
  );

  return (
    <div className="contact-form">
      <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Contact Us</h2>
      <h2>
        Phone: (425) 868-3820 <br />
        PO Box 1867 400 NW Gilman Blvd. Issaquah, WA 98027 <br />
        We're happy to answer questions or help you with returns. Please fill
        out the form below if you need assistance.
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />


        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="details">Details *</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          required
        />

        <CaptchaPlaceholder />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
