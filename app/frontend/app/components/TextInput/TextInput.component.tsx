"use client";
import { useState } from "react";

import { TextInputProps } from "../../types/TextInputProps.ts";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function TextInput(
    { required, sensitive, placeholder }: TextInputProps,
) {
    const [showText, setShowText] = useState(true);
    const type = sensitive ? (showText ? "password" : "text") : "text";

    return (
        <div className="p-1 m-1 text-[var(--text-primary)] border-1 border-color-[var(--accent-green)] rounded-md w-full max-w-sm">
            <input type={type} required={required} placeholder={placeholder} className="appearance-none border-none outline-none bg-transparent p-0 m-0"/>
            {sensitive && (
                <button
                    type="button"
                    onClick={() => setShowText(!showText)}
                >
                    {showText ? <VisibilityOffIcon className="mx-2"/> : <VisibilityIcon className="mx-2"/>}
                </button>
            )}
        </div>
    );
}
