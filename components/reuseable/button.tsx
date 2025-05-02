"use client"
import React from 'react'

interface ButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export default function Button({ text, className, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-full transition-colors ${className}`}
        >
            {text}
        </button>
    )
}
