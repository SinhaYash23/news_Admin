import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import {Editor} from 'primereact/editor'

export default function AddNews() {
  const { control, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('');

  const categories = [
    { label: "Politics", value: "politics" },
    { label: "Technology", value: "technology" },
    { label: "Sports", value: "sports" },
  ];

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleImageUpload = (event) => {
    const file = event.files[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add News</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputText {...field} placeholder="Enter title" className="w-full" />
              )}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={categories}
                  placeholder="Select a category"
                  className="w-full"
                />
              )}
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
          <Editor value={text} onTextChange={(e)=> setText(e.htmlValue)} style={{height: '320px'}}/>
          

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
            <Button
                label="Add News"
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            />
            </div>

        </form>
      </div>
    </div>
  );
}
