import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslations } from "../../../hooks/translations"
import { Plausible } from "../../../services/plausible"
import { CgArrowRightO } from "react-icons/cg"
import { BsFillTelephoneFill } from "react-icons/bs"

export const FooterSection = ({ need }) => {
  const router = useRouter()
  const translations = useTranslations()
  const { locale } = router

  return (
    <div className="flex -mt-px divide-x divide-gray-200">
      <div className="flex flex-1 w-0">
        <Link href={need.url} locale={locale}>
          <a className="relative inline-flex items-center justify-center flex-1 w-0 py-3 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
            <CgArrowRightO />

            <span className="ml-3">
              {translations["pages"]["ticket"]["details"]}
            </span>
          </a>
        </Link>
      </div>

      {need.isPhonePublic && (
        <div className="flex flex-1 w-0 -ml-px">
          <a
            href={`tel:${need.phone}`}
            onClick={Plausible.registerIntentionPhoneCall}
            className="relative inline-flex items-center justify-center flex-1 w-0 py-3 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
          >
            <BsFillTelephoneFill />
            <span className="ml-3">{need.phone}</span>
          </a>
        </div>
      )}
    </div>
  )
}
