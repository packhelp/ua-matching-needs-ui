import React from "react"

type FormFieldProps = {
  title: string
  children: React.ReactNode
  disclaimer?: string
}

export const FormField = (props: FormFieldProps) => {
  const { title, children, disclaimer } = props
  return (
    <div className="mt-4">
      <div className="font-bold text-sm mb-1">{title}</div>
      {children}
      <div className="flex justify-end text-xs text-slate-400 pr-2">
        {disclaimer}
      </div>
    </div>
  )
}
