import React, { useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCategory = () => {
  const { axios } = useAppContext()
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState({
    title: '',
    description: '',
    href: '',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('categoryData', JSON.stringify(category));

      const { data } = await axios.post('/api/category/add-category', formData);

      if (data.success) {
        toast.success(data.message);
        setCategory({ title: '', description: '', href: '' });
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">

      <Title 
        title="Створіть категорію" 
        subtitle="Додайте фото, назву та опис, щоб сформувати категорію" 
      />

      <form 
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 mt-10 max-w-2xl text-gray-600"
      >

        {/* image upload */}
        <div className="flex items-center gap-4">
          <label htmlFor="category-image" className="cursor-pointer">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="upload"
              className="h-20 w-20 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
            <input 
              type="file" 
              id="category-image" 
              hidden 
              onChange={(e) => setImage(e.target.files[0])} 
            />
          </label>

          <p className="text-gray-500">Додайте фото для категорії</p>
        </div>

        {/* title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium text-gray-700">Назва категорії</label>
          <input 
            type="text" 
            id="title" 
            placeholder="Введіть назву"
            required
            value={category.title}
            onChange={(e) => setCategory({ ...category, title: e.target.value })}
            className="mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm outline-none focus:border-army-700 transition"
          />
        </div>

        {/* description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium text-gray-700">Опис</label>
          <textarea
            id="description"
            placeholder="Додайте опис"
            rows={6}
            value={category.description}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
            className="mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm outline-none focus:border-army-700 transition resize-none"
          />
        </div>

        {/* button */}
        <button 
          type="submit"
          className="
            w-full py-3 rounded-xl text-white font-semibold shadow-md
            bg-linear-to-r from-army-900 to-army-800
            hover:opacity-90 transition
            flex items-center justify-center gap-2">
          {isLoading ? 'Завантаження...' : 'Завантажити категорію'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
