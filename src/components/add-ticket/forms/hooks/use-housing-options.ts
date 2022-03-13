import { useTranslations } from "../../../../hooks/translations"
import dayjs from "dayjs"

export const useHousingOptions = () => {
  const translations = useTranslations()
  return {
    housingFrom: [
      {
        value: dayjs().format("YYYY-MM-DD"),
        label: translations.addTicket.date.today,
      },
      {
        value: dayjs().add(1, "day").format("YYYY-MM-DD"),
        label: translations.addTicket.date.tomorrow,
      },
    ],
    housingUntil: [
      {
        value: dayjs().add(2, "day").format("YYYY-MM-DD"),
        label: translations.addTicket.date.nightOrTwo,
      },
      {
        value: dayjs().add(5, "day").format("YYYY-MM-DD"),
        label: translations.addTicket.date.coupleOfDays,
      },
      {
        value: dayjs().add(2, "weeks").format("YYYY-MM-DD"),
        label: translations.addTicket.date.coupleOfWeeks,
      },
      { value: "", label: translations.addTicket.date.noIdea },
    ],
  }
}
