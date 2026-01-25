import React, { useState, useRef, useEffect } from 'react';

const QuestionsCard = ({ data }) => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState("0px");

    // плавне відкриття height
    useEffect(() => {
        if (open) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [open]);

    return (
        <div className="w-full shadow-lg rounded-xl overflow-hidden transition-all duration-500">
            <div className="p-4 sm:p-5 cursor-pointer w-full" onClick={() => setOpen(!open)}>
                {/* question */}
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium text-primary">
                        {data.question}
                    </h3>

                    <span className={`transition-transform duration-500 ${open ? "rotate-180" : "rotate-0"}`}>
                        ▼
                    </span>
                </div>

                {/* animated answer */}
                <div
                    ref={contentRef}
                    style={{ height }}
                    className="overflow-hidden transition-all duration-500"
                >
                    <p className="text-sm text-gray-600 px-1 mt-2 whitespace-normal wrap-break-word">
                        {data.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuestionsCard;
