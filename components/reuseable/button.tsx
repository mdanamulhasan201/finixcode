import React from 'react'

export default function Button({ text, className }: { text: string, className?: string }) {
    return (
        <button className={`${className} bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-full transition-colors`}>
            {text}
        </button>
    )
}
