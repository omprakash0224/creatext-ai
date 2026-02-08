"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { TEMPLATE } from '../../_components/TemplateSection'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS {
    selectedTemplate?: TEMPLATE
    userFormInput:any,
    loading:boolean
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
    const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({})
    const [formData, setFormData] = useState<any>()

    const handleSelect = (index: number, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [index]: value,
        }))
    }

    const handleInputChange=(event:any)=>{
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    const onSubmit=(e:any)=>{
        e.preventDefault();
        userFormInput(formData)
    }

    

    return (
        <div className='p-5 shadow-md border rounded-lg'>
            {/* @ts-ignore */}
            <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70} />
            <h2 className='font-bold text-2xl mb-4 text-purple-600'>{selectedTemplate?.name}</h2>
            <p className='text-gray-600 text-md'>{selectedTemplate?.desc}</p>
            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className="my-2 flex flex-col gap-2 mb-7">
                        <label className="block font-medium mb-2">{item.label}</label>
                        {item.field === 'input' ? (
                            <Input name={item.name} required={item?.required} 
                            onChange={handleInputChange}
                            />
                        ) : item.field === 'dropdown' && Array.isArray(item.options) ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="px-4 py-2 bg-gray-200 rounded-md">
                                    {selectedValues[index] || item.name || 'Select an option'}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {item.options.map((option, optionIndex) => (
                                        <DropdownMenuItem
                                            key={optionIndex}
                                            onClick={() => {
                                                // Simulate an event object for handleInputChange
                                                handleInputChange({
                                                    target: {
                                                        name: item.name, // Use the name of the dropdown field
                                                        value: option,   // Selected option value
                                                    },
                                                });
                                                handleSelect(index, option); // Update the selected value
                                            }}
                                        >
                                            {option}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : null}
                        {item.field === 'dropdown' && selectedValues[index] && (
                            <p className="text-sm text-gray-700 mt-2">
                                Selected: {selectedValues[index]}
                            </p>
                        )}
                    </div>
                ))}
                <Button type='submit' 
                className='w-full py-6 bg-purple-700 hover:bg-purple-500'
                disabled={loading}
                >
                    {loading&&<Loader2Icon className='animate-spin'/>}
                    Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection
