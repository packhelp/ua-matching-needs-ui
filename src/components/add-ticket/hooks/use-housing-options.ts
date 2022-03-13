import { useTranslations } from "../../../hooks/translations"
import dayjs from "dayjs"

export const housingLabels = {
  "a-night": "A night or two",
  "some-days": "A couple of days",
  weeks: "A couple of weeks",
  "no-idea": "No idea",
}

export const TODAY = dayjs().format("YYYY-MM-DD")

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
        description: housingLabels["a-night"],
      },
      {
        value: dayjs().add(5, "day").format("YYYY-MM-DD"),
        label: translations.addTicket.date.coupleOfDays,
        description: housingLabels["some-days"],
      },
      {
        value: dayjs().add(2, "weeks").format("YYYY-MM-DD"),
        label: translations.addTicket.date.coupleOfWeeks,
        description: housingLabels["weeks"],
      },
      {
        value: "",
        label: translations.addTicket.date.noIdea,
        description: housingLabels["no-idea"],
      },
    ],
  }
}
