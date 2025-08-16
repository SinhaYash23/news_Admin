import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Editor } from 'primereact/editor';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNews() {
  const { control, handleSubmit, setValue, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  // Fetch news list
  const fetchNews = async () => {
    try {
      const res = await axios.get('https://api.yashsinha.online/api/news');
      setNewsList(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://api.yashsinha.online/api/categories?isActive=true&page=1&limit=10search=technology');
      setCategories(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.name === selectedCategoryName
      );

      if (!selectedCategory) {
        toast.error('Invalid category selected');
        return;
      }

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', selectedCategory._id); 
      formData.append('publishDate', data.publishDate.toISOString());
      formData.append('details', text);
      formData.append('image', data.image);

      const res = await axios.post('https://api.yashsinha.online/api/news', formData,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      if (res.data.success) {
        toast.success('News added successfully!');
        reset();
        setText('');
        setImagePreview(null);
        fetchNews();
      } else {
        toast.error(res.data.message || 'Failed to add news.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred.');
    }
  };

  // Image upload handler
  const handleImageUpload = (event) => {
    const file = event.files[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add News</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <InputText {...field} placeholder="Enter title" className="w-full" />
              )}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
            <Dropdown
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.value)}
              options={categories}
              optionLabel="name"
              optionValue="name"
              placeholder="Select a category"
              className="w-full"
            />
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
            <Controller
              name="publishDate"
              control={control}
              render={({ field }) => (
                <Calendar {...field} showIcon className="w-full" placeholder="Select date" />
              )}
            />
          </div>

          {/* News Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">News Details</label>
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">News Image</label>
            <FileUpload
              mode="basic"
              name="image"
              accept="image/*"
              customUpload
              chooseLabel="Upload Image"
              onSelect={handleImageUpload}
              className="w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-40 w-full object-cover rounded-md border"
              />
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button label="Add News" type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white" />
          </div>
        </form>

        {/* News List */}
        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-xl font-semibold mb-4">News List</h3>
          {newsList.length === 0 ? (
            <p className="text-gray-500">No news available.</p>
          ) : (
            <ul className="space-y-4">
              {newsList.map((news) => (
                <li key={news._id} className="p-4 bg-white shadow rounded border">
                  <h4 className="text-lg font-bold">{news.title}</h4>
                  <p className="text-sm text-gray-600">Category: {news.category?.name || news.category}</p>
                  <div className="text-sm mt-2" dangerouslySetInnerHTML={{ __html: news.details }} />
                  {news.imageUrl && (
                    <img src={news.imageUrl} alt={news.title} className="mt-2 w-full h-40 object-cover rounded" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
