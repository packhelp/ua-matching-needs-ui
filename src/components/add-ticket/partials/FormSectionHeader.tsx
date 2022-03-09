
type FormSectionHeaderProps = {
  step?: string
}

export const FormSectionHeader = (props: FormSectionHeaderProps) => {
  const { step } = props
  return (
    <div className="flex border-l-4 border-blue-500 py-1 pl-4 mb-1">
      {step && <div className="text-base font-bold">{step}</div>}
    </div>
  )
}