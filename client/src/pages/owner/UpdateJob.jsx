// src/pages/owner/UpdateJob.jsx  (або де у вас лежить)
import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const UpdateJob = () => {
    const { axios } = useAppContext()
    const [image, setImage] = useState(null); // може бути File або string (URL)
    const [previewUrl, setPreviewUrl] = useState(null); // локальне превʼю для File
    const [isLoding, setIsLoading] = useState(false);
    const { id } = useParams();

    // окремі масиви
    const [responsibilities, setResponsibilities] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [terms, setTerms] = useState([]);

    // fields
    const [job, setJob] = useState({
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

    const fetchJob = async () => {
        try {
            const { data } = await axios.get(`/api/job/job/${id}`)
            if (data.success) {
                const j = data.job
                // image може бути URL
                setImage(j.image || null)
                setPreviewUrl(null) // поки що немає локального файлу
                setResponsibilities(j.responsibilities || [])
                setRequirements(j.requirements || [])
                setTerms(j.terms || [])
                setJob({
                    name: j.name || "",
                    description: j.description || "",
                    responsibilities: j.responsibilities || [],
                    requirements: j.requirements || [],
                    terms: j.terms || [],
                })
            }
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        fetchJob();
        // очистити тимчасове previewUrl при unmount
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, []); // запуск один раз

    // --- робота з превʼю / вибір нового зображення ---
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // відмінити старе preview
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setImage(file); // зберігаємо File
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    // --- видалити старе фото та поставити null (опціонально) ---
    const removeImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
        setImage(null)
    }

    // --- видалення з масивів ---
    const removeResponsibility = (index) => {
        const updated = [...responsibilities];
        updated.splice(index, 1);
        setResponsibilities(updated);
    };
    const removeRequirement = (index) => {
        const updated = [...requirements];
        updated.splice(index, 1);
        setRequirements(updated);
    };
    const removeTerm = (index) => {
        const updated = [...terms];
        updated.splice(index, 1);
        setTerms(updated);
    }

    // --- додавання в масиви ---
    const addResponsibility = () => {
        if (!resInput.trim()) return;
        setResponsibilities(prev => [...prev, resInput.trim()]);
        setResInput("");
    };
    const addRequirement = () => {
        if (!reqInput.trim()) return;
        setRequirements(prev => [...prev, reqInput.trim()]);
        setReqInput("");
    };
    const addTerm = () => {
        if (!termsInput.trim()) return;
        setTerms(prev => [...prev, termsInput.trim()]);
        setTermsInput("");
    };

    // --- submit ---
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (isLoding) return;
        setIsLoading(true);

        try {
            const formData = new FormData();

            // якщо image є File → додаємо у formData
            const isFile = image && (image instanceof File || Object.prototype.toString.call(image) === '[object File]');
            if (isFile) {
                formData.append('image', image);
            }
            // Формуємо jobToSend
            const jobToSend = {
                ...job,
                responsibilities,
                requirements,
                terms
            };

            formData.append('jobData', JSON.stringify(jobToSend));

            // Виклик API — бекенд має коректно обробляти випадок без файлу
            const { data } = await axios.post(`/api/job/edit-job/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                toast.success(data.message);
                // очищення (або можна перенаправити)
                setIsLoading(false);
            } else {
                toast.error(data.message);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error.message || 'Помилка при оновленні вакансії');
            setIsLoading(false);
        }
    };

    // --- preview src: якщо є previewUrl (новий файл) — показуємо його, інакше якщо image (URL строка) — показуємо URL, інакше іконку upload ---
    const previewSrc = previewUrl || (typeof image === 'string' ? image : null);

    return (
        <div className='px-4 py-10 md:px-10 flex-1'>
            <Title title='Змінити вакансію' subtitle='Змініть деталі вакансії' />
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
                {/* image */}
                <div className='flex items-center gap-4 w-full'>
                    <label htmlFor='job-image' className='cursor-pointer'>
                        <img
                            src={previewSrc || assets.upload_icon}
                            alt=""
                            className='h-24 w-24 object-cover rounded cursor-pointer border'
                        />
                        <input type="file" id='job-image' accept="image/*"
                            onChange={handleImageChange}
                            hidden />
                    </label>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm text-gray-500'>Додайте фото (за потреби)</p>
                        <div className='flex gap-2'>
                            <button type="button" onClick={removeImage} className='px-3 py-1 bg-red-50 text-red-600 rounded'>Видалити</button>
                        </div>
                    </div>
                </div>

                {/* name */}
                <div className='flex flex-col w-full'>
                    <label>Назва</label>
                    <input type="text" placeholder='Введіть назву' required value={job.name}
                        onChange={(e) => setJob({ ...job, name: e.target.value })}
                        className='px-3 py-2 mt-1 border rounded-md outline-none' />
                </div>

                {/* description */}
                <div className='flex flex-col w-full'>
                    <label>Опис</label>
                    <textarea rows={4} placeholder='Додайте опис' value={job.description}
                        onChange={(e) => setJob({ ...job, description: e.target.value })}
                        className='px-3 py-2 mt-1 border rounded-md outline-none' />
                </div>

                {/* RESPONSIBILITIES */}
                <div className='flex flex-col w-full'>
                    <label>Обов’язки</label>
                    {responsibilities.length > 0 && (
                        <ul className='mt-2 ml-2 text-sm space-y-2'>
                            {responsibilities.map((item, index) => (
                                <div key={index} className='w-full flex justify-between items-center'>
                                    <li className='list-none'>- {item}</li>
                                    <button className='text-red-400 hover:text-red-600' onClick={() => removeResponsibility(index)} type="button">X</button>
                                </div>
                            ))}
                        </ul>
                    )}
                    <div className='flex gap-2 mt-2'>
                        <input type="text" placeholder="Додайте обов’язок" value={resInput}
                            onChange={(e) => setResInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                            className='px-3 py-2 border rounded-md outline-none w-full' />
                        <button type="button" onClick={addResponsibility} className='px-4 py-2 bg-primary text-white rounded-md'>Додати</button>
                    </div>
                </div>

                {/* REQUIREMENTS */}
                <div className='flex flex-col w-full'>
                    <label>Вимоги</label>
                    {requirements.length > 0 && (
                        <ul className='mt-2 ml-2 text-sm space-y-2'>
                            {requirements.map((item, index) => (
                                <div key={index} className='w-full flex justify-between items-center'>
                                    <li className='list-none'>- {item}</li>
                                    <button className='text-red-400 hover:text-red-600' onClick={() => removeRequirement(index)} type="button">X</button>
                                </div>
                            ))}
                        </ul>
                    )}
                    <div className='flex gap-2 mt-2'>
                        <input type="text" placeholder="Додайте вимогу" value={reqInput}
                            onChange={(e) => setReqInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                            className='px-3 py-2 border rounded-md outline-none w-full' />
                        <button type="button" onClick={addRequirement} className='px-4 py-2 bg-primary text-white rounded-md'>Додати</button>
                    </div>
                </div>

                {/* TERMS */}
                <div className='flex flex-col w-full'>
                    <label>Умови</label>
                    {terms.length > 0 && (
                        <ul className='mt-2 ml-2 text-sm space-y-2'>
                            {terms.map((item, index) => (
                                <div key={index} className='w-full flex justify-between items-center'>
                                    <li className='list-none'>- {item}</li>
                                    <button className='text-red-400 hover:text-red-600' onClick={() => removeTerm(index)} type="button">X</button>
                                </div>
                            ))}
                        </ul>
                    )}
                    <div className='flex gap-2 mt-2'>
                        <input type="text" placeholder="Додайте умову" value={termsInput}
                            onChange={(e) => setTermsInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTerm())}
                            className='px-3 py-2 border rounded-md outline-none w-full' />
                        <button type="button" onClick={addTerm} className='px-4 py-2 bg-primary text-white rounded-md'>Додати</button>
                    </div>
                </div>

                {/* SUBMIT */}
                <button type='submit' className='w-max mt-4 px-4 py-2.5 bg-primary text-white rounded-md hover:bg-primary/80 transition-all font-semibold flex items-center gap-2'>
                    <img src={assets.tick_icon} alt="" />
                    {isLoding ? 'Завантаження...' : 'Завантажити вакансію'}
                </button>
            </form>
        </div>
    )
}

export default UpdateJob
