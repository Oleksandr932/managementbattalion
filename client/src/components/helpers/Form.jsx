import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useDispatch } from 'react-redux';
import { setForm } from '../../store/formSlice';

function ContactForm() {
    const [state, handleSubmit] = useForm("mykergvl");
    const dispatch = useDispatch();

    if (state.succeeded) {
        return (
            <div className="fixed inset-0 bg-neutral-800/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
                    <p className="text-lg font-semibold text-primary">
                        Дякуємо за повідомлення, наші рекрутери зв'яжуться з вами.
                    </p>
                    <button
                        className="mt-6 w-full py-3 rounded-xl text-white font-semibold 
                        bg-linear-to-r from-army-900 to-army-800"
                        onClick={() => dispatch(setForm(false))}
                    >
                        Закрити
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-neutral-800/60 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="relative bg-white max-w-2xl w-full p-8 rounded-2xl shadow-xl"
            >

                {/* ❌ Кнопка закриття */}
                <button
                    type="button"
                    onClick={() => dispatch(setForm(false))}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                >
                    x
                </button>

                <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                    Залишіть ваші дані
                </h2>

                {/* Email */}
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="email" className="text-gray-700 font-medium">
                        Введіть свою електронну адресу
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="phone" className="text-gray-700 font-medium">
                        Введіть свій номер телефону
                    </label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary"
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1 mb-6">
                    <label htmlFor="message" className="text-gray-700 font-medium">
                        Ваше повідомлення
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        placeholder="Введіть назву посади, а також ваше ім’я та прізвище."
                        className="px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-3 text-white font-semibold rounded-xl 
                    bg-linear-to-r from-army-900 to-army-800 hover:opacity-90 transition"
                >
                    {state.submitting ? "Надсилання..." : "Надіслати"}
                </button>
            </form>
        </div>
    );
}

function FormApp() {
    return <ContactForm />;
}

export default FormApp;
