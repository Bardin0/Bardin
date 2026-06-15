import { ButtonGlowProps } from "../../types/ButtonGlowProps.ts";

export default function ButtonGlow({ text, type }: ButtonGlowProps) {
    return (
        <button
            type={type}
            className="p-1 m-1 bg-[var(--accent-blue)]  border-1 border-white rounded-md text-[var(--text-primary)] cursor-pointer select-none hover:scale-110 duration-300"
        >
            {text}
        </button>
    );
}
