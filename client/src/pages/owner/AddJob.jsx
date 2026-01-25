import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddJob = () => {
  const { axios } = useAppContext()
  const [image, setImage] = useState(null);
  const [isLoding, setIsLoading] = useState(false);

  // окремі масиви
  const [responsibilities, setResponsibilities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [terms, setTerms] = useState([]);
  const [categoryData, setСategoryData] = useState([]);

  // завантаження категорій
  const fetchСategory = async () => {
    try {
      const { data } = await axios.get('/api/category/all-category')

      if (data.success) {
        setСategoryData(data.reports)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  // поля вакансії
  const [job, setJob] = useState({
    category: "",
    name: "",
    description: "",
    responsibilities: [],
    requirements: [],
    terms: [],
  });

  // тимчасові інпути
  const [resInput, setResInput] = useState("");
  const [reqInput, setReqInput] = useState("");
  const [termsInput, setTermsInput] = useState("");

  // видалення з масивів
  const removeResponsibility = (index) => {
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities.splice(index, 1);
    setResponsibilities(updatedResponsibilities);
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };

  const removeTerm = (index) => {
    const updatedTerms = [...terms];
    updatedTerms.splice(index, 1);
    setTerms(updatedTerms);
  }

  // додавання в масиви
  const addResponsibility = () => {
    if (!resInput.trim()) return;
    setResponsibilities([...responsibilities, resInput.trim()]);
    setResInput("");
  };

  const addRequirement = () => {
    if (!reqInput.trim()) return;
    setRequirements([...requirements, reqInput.trim()]);
    setReqInput("");
  };

  const addTerm = () => {
    if (!termsInput.trim()) return;
    setTerms([...terms, termsInput.trim()]);
    setTermsInput("");
  };

  // відправка форми
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoding) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);

      // формуємо job
      const jobToSend = {
        ...job,
        responsibilities,
        requirements,
        terms
      };

      formData.append('jobData', JSON.stringify(jobToSend));

      const { data } = await axios.post('/api/job/add-job', formData);

      if (data.success) {
        toast.success(data.message);
        setJob({
          category: "",
          name: "",
          description: "",
          responsibilities: [],
          requirements: [],
          terms: [],
        })
        setImage(null);
        setResponsibilities([]);
        setRequirements([]);
        setTerms([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchСategory();
  }, []);

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      {/* title */}
      <Title title='Створіть вакансію' subtitle='Додайте Фото, назву та інші деталі' />
      {/* form */}
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='job-image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="" className='h-24 rounded cursor-pointer' />
            <input type="file" id='job-image'
              onChange={(e) => setImage(e.target.files[0])}
              hidden />
          </label>
          <p className='text-sm text-gray-500'>Додайте фото</p>
        </div>

        {/* Categories */}
        <div className="mt-6 max-w-xl">
          <label className="text-gray-600">Категорія</label>
          <select value={job.category || ""}
            onChange={(e) => setJob({ ...job, category: e.target.value })}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none w-full bg-white cursor-pointer">
            <option value="">Усі вакансії</option>

            {categoryData.map((direction) => (
              <option key={direction._id} value={direction._id}> {direction.title}</option>
            ))}
          </select>
        </div>

        {/* name */}
        <div className='flex flex-col w-full'>
          <label>Назва</label>
          <input type="text"
            placeholder='Введіть назву'
            required
            value={job.name}
            onChange={(e) => setJob({ ...job, name: e.target.value })}
            className='px-3 py-2 mt-1 border rounded-md outline-none' />
        </div>

        {/* description */}
        <div className='flex flex-col w-full'>
          <label>Опис</label>
          <textarea rows={4}
            placeholder='Додайте опис'
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            className='px-3 py-2 mt-1 border rounded-md outline-none' />
        </div>

        {/* RESPONSIBILITIES */}
        <div className='flex flex-col w-full'>
          <label>Обов’язки</label>

          {responsibilities.length > 0 && (
            <ul className='mt-2 ml-2 text-sm'>
              {responsibilities.map((item, index) => (
                <div className='w-full flex justify-between'>
                  <li key={index}>- {item}</li>
                  <button className='text-red-400 hover:text-red-600' onClick={() => removeResponsibility(index)} type="button">X</button>
                </div>
              ))}
            </ul>
          )}

          <div className='flex gap-2 mt-2'>
            <input type="text"
              placeholder="Додайте обов’язок"
              value={resInput}
              onChange={(e) => setResInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
              className='px-3 py-2 border rounded-md outline-none w-full' />
            <button type="button"
              onClick={addResponsibility}
              className='px-4 py-2 bg-primary text-white rounded-md'>
              Додати
            </button>
          </div>
        </div>

        {/* REQUIREMENTS */}
        <div className='flex flex-col w-full'>
          <label>Вимоги</label>

          {requirements.length > 0 && (
            <ul className='mt-2 ml-2 text-sm'>
              {requirements.map((item, index) => (
                <div className='w-full flex justify-between'>
                  <li key={index}>- {item}</li>
                  <button className='text-red-400 hover:text-red-600' onClick={() => removeRequirement(index)} type="button">X</button>
                </div>
              ))}
            </ul>
          )}

          <div className='flex gap-2 mt-2'>
            <input type="text"
              placeholder="Додайте вимогу"
              value={reqInput}
              onChange={(e) => setReqInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
              className='px-3 py-2 border rounded-md outline-none w-full' />
            <button type="button"
              onClick={addRequirement}
              className='px-4 py-2 bg-primary text-white rounded-md'>
              Додати
            </button>
          </div>
        </div>

        {/* TERMS */}
        <div className='flex flex-col w-full'>
          <label>Умови</label>

          {terms.length > 0 && (
            <ul className='mt-2 ml-2 text-sm'>
              {terms.map((item, index) => (
                <div className='w-full flex justify-between'>
                  <li key={index}>- {item}</li>
                  <button className='text-red-400 hover:text-red-600' onClick={() => removeTerm(index)} type="button">X</button>
                </div>
              ))}
            </ul>
          )}

          <div className='flex gap-2 mt-2'>
            <input type="text"
              placeholder="Додайте умову"
              value={termsInput}
              onChange={(e) => setTermsInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTerm())}
              className='px-3 py-2 border rounded-md outline-none w-full' />
            <button type="button"
              onClick={addTerm}
              className='px-4 py-2 bg-primary text-white rounded-md'>
              Додати
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button type='submit'
          className='w-max mt-4 px-4 py-2.5 bg-primary text-white rounded-md hover:bg-primary/80 transition-all font-semibold flex items-center gap-2'>
          <img src={assets.tick_icon} alt="" />
          {isLoding ? 'Завантаження...' : 'Завантажити вакансію'}
        </button>

      </form>
    </div>
  )
}

export default AddJob
