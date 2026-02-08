import React, {useEffect, useState} from 'react'
import Templates from '@/app/(data)/Templates'
import TemplateCard from './TemplateCard'

export interface TEMPLATE{
  name:string,
  desc:string,
  category:string,
  icon:string,
  aiPrompt:string,
  slug:string,
  form?:FORM[]
}

export interface FORM{
  label:string,
  field:string,
  name:string,
  required?:boolean,
  type?:string,
  options?:string[]
}

function TemplateSection({userSearchInput}:any) {

  const [templateList, setTemplateList] = useState(Templates)

  useEffect(()=>{
    console.log(userSearchInput)
    if(userSearchInput)
    {
      const filteredTemplates = Templates.filter((item:TEMPLATE)=>{
        return item.name.toLowerCase().includes(userSearchInput.toLowerCase()) || item.category.toLowerCase().includes(userSearchInput.toLowerCase())
      })
      setTemplateList(filteredTemplates)
    }
    else{
      setTemplateList(Templates)
    }
  }),[userSearchInput]
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
      {templateList.map((item:TEMPLATE,index:number)=>(
        <TemplateCard {...item}/>
      ))}
    </div>
  )
}

export default TemplateSection
