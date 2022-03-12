import { useTranslations } from "../../../hooks/translations"

export const FormFeedback = ({ mutation }) => {
  const translations = useTranslations()
  return (
    <div>
      {mutation.isError ? (
        <div className="flex space-x-1 mt-2 items-center justify-center">
          <div
            className="inline-flex items-center w-full place-content-center
    py-1 border border-transparent shadow-sm text-sm
    font-medium text-white bg-red-600
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-default"
          >
            {translations["errors"]["error-occured-while-adding"]}
            {mutation.error.message}
          </div>
        </div>
      ) : null}

      {mutation.isSuccess ? (
        <div className="flex space-x-1 mt-2 items-center justify-center">
          <div
            className="inline-flex items-center w-full place-content-center
    py-1 border border-transparent shadow-sm text-sm
    font-medium text-white bg-green-600
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-default"
          >
            {translations["pages"]["add-ticket"]["request-added"]}
          </div>
        </div>
      ) : null}
    </div>
  )
}
