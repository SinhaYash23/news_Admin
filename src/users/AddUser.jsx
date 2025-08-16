import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().required('Role is required'),
  adminKey: yup.string().when('role', {
    is: 'admin',
    then: (schema)=>schema.required("Admin key is required"),
  }),
  section: yup.string().when('role', {
    is: 'editor',
    then: (schema) => schema.required("Section is required"),
  }),
});

const AddUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const role = watch('role');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://api.yashsinha.online/api/auth/register', data);
      alert('User registered successfully!');
      reset();
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };
// News
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create New User</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Role</label>
          <select
            {...register('role')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        {/* Admin Key (Only if role is admin) */}
        {role === 'admin' && (
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">Admin Key</label>
            <input
              type="text"
              {...register('adminKey')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.adminKey && <p className="text-red-500 text-sm mt-1">{errors.adminKey.message}</p>}
          </div>
        )}

        {/* Section (Only if role is editor) */}
        {role === 'editor' && (
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">Section</label>
            <input
              type="text"
              {...register('section')}
              placeholder="e.g., Tech, Sports"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.section && <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {isSubmitting ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
