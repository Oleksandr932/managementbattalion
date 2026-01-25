import React, { useState, useRef, useCallback } from 'react';
import { assets, needsCategory } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Title from '../../components/owner/Title';

const AddNeeds = () => {
  const { axios } = useAppContext();
  const [isLoding, setIsLoading] = useState(false);

  const [needs, setNeeds] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(needsCategory[0]._id);
  const [newItemText, setNewItemText] = useState('');

  const inputRef = useRef(null);

  const currentCategory = needsCategory.find(cat => cat._id === selectedCategoryId);

  const handleAddItem = useCallback(() => {
    const itemText = newItemText.trim();
    if (!itemText || !currentCategory) return;

    setNeeds(prevNeeds => {
      const categoryIndex = prevNeeds.findIndex(n => n.category === currentCategory.category);

      if (categoryIndex > -1) {
        const updatedNeeds = [...prevNeeds];
        updatedNeeds[categoryIndex].items.push(itemText);
        return updatedNeeds;
      } else {
        return [
          ...prevNeeds,
          {
            category: currentCategory.category,
            items: [itemText],
            isAvaliable: true,
          }
        ];
      }
    });

    setNewItemText('');
    if (inputRef.current) inputRef.current.focus();
  }, [newItemText, currentCategory]);

  const handleDeleteItem = useCallback((category, index) => {
    setNeeds(prevNeeds => {
      const updatedNeeds = [...prevNeeds];
      updatedNeeds.find(n => n.category === category).items.splice(index, 1);
      return updatedNeeds;
    });
  })
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (needs.length === 0) {
      toast.error("Будь ласка, додайте хоча б одну потребу.");
      return;
    }

    const formData = new FormData();
    formData.append('needsData', JSON.stringify(needs));

    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/needs/add-needs', formData);

      if (data.success) {
        toast.success(data.message);
        setNeeds([]);
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
    <form onSubmit={handleSubmit} className="px-4 py-10 md:px-10 flex-1">
      <Title title="Створення списку потреб" subtitle="Оберіть категорію та додавайте потреби" />

      {/* Select category */}
      <div className="mt-6 max-w-xl">
        <label className="text-gray-600">Категорія</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => {
            setSelectedCategoryId(e.target.value);
            if (inputRef.current) inputRef.current.focus();
          }}
          className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full bg-white cursor-pointer"
        >
          {needsCategory.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.category}</option>
          ))}
        </select>
      </div>

      {/* Category description */}
      {currentCategory && (
        <div className="px-3 py-2 mt-3 border border-borderColor rounded-md text-sm text-neutral-500 max-w-xl">
          {currentCategory.discription}
        </div>
      )}

      {/* Current needs list */}
      <div className="mt-6 max-w-xl">
        {needs.length === 0 ? (
          <p className="px-3 py-2 border border-borderColor rounded-md text-sm text-neutral-500">
            Поки що немає доданих потреб.
          </p>
        ) : (
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">Поточний список потреб:</h3>

            {needs.map((group, index) => (
              <div key={index} className="px-3 py-2 mb-4 border border-borderColor rounded-md text-sm text-neutral-700">
                <strong className="text-primary">{group.category}</strong>
                <ul className="list-disc ml-5 mt-1">
                  {group.items.map((item, idx) => (
                    <div className='w-full flex justify-between'>
                      <li key={idx}> {item}</li>
                      <button className='text-red-400 hover:text-red-600' onClick={() => handleDeleteItem(group.category, idx)} type="button">X</button>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input + button */}
      <div className="flex md:flex-row items-center max-w-xl">
        <input
          ref={inputRef}
          type="text"
          placeholder={`Введіть потребу для категорії "${currentCategory?.category}"`}
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
          className="px-3 py-2 mt-2 border border-borderColor rounded-md outline-none w-full"
        />
        <button
          type="button"
          onClick={handleAddItem}
          className="w-max mt-2 ml-2 px-4 py-2.5 bg-primary text-white rounded-md hover:bg-primery-dull transition-all cursor-pointer font-semibold">
          Додати
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-max mt-4 px-4 py-2.5 bg-primary text-white rounded-md hover:bg-primery-dull transition-all font-semibold cursor-pointer flex items-center gap-2">
        <img src={assets.tick_icon} alt="" />
        {isLoding ? 'Завантаження...' : 'Надіслати всі потреби'}
      </button>
    </form>
  );
};

export default AddNeeds;
