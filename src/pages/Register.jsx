import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Create Account</h2>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <InputText 
            placeholder="Enter your name"
            className="w-full" 
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <InputText 
            placeholder="Enter your email"
            className="w-full" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <Password 
            placeholder="Create password"
            className="w-full"
            feedback={true}
            toggleMask
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <Button label="Register" className="w-full p-button-success mb-3" />
        
        <div className="text-center text-sm">
          Already have an account?
          <Link to="/login" className="text-pink-600 hover:underline ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
