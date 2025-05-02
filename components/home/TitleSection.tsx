import React from 'react'

export default function TitleSection({ title }: { title: string }) {
    return (
        <div>
            <h1 className="text-4xl font-bold">
                {title}
            </h1>
        </div>
    )
}
