import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const categories = [
  { label: "Politics", value: "politics" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
];

export default function NewsForm({ defaultValues = {}, onSubmit, loading }) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: defaultValues.title || "",
      category: defaultValues.category || "",
      publishDate: defaultValues.publishDate ? new Date(defaultValues.publishDate) : null,
      details: defaultValues.details || "",
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load preview if editing with existing image
  useEffect(() => {
    if (defaultValues.imageUrl) {
      setImagePreview(defaultValues.imageUrl);
    }
  }, [defaultValues]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitForm = (data) => {
    onSubmit({ ...data, image: imageFile });
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white p-8 rounded shadow-md max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {defaultValues.title ? "Edit News" : "Add News"}
      </h2>

      {/* Title */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => <InputText {...field} className="w-full" placeholder="News title" />}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
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
        <label className="block mb-1 text-sm font-medium text-gray-700">Publish Date</label>
        <Controller
          name="publishDate"
          control={control}
          render={({ field }) => (
            <Calendar {...field} showIcon className="w-full" placeholder="Choose date" />
          )}
        />
      </div>

      {/* Details */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Details</label>
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <InputTextarea
              {...field}
              rows={6}
              className="w-full"
              placeholder="Write full news content..."
            />
          )}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 h-48 w-full object-cover rounded border"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center pt-4">
        <Button
          type="submit"
          label={loading ? "Saving..." : defaultValues.title ? "Update News" : "Add News"}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        />
      </div>
    </form>
  );
}
