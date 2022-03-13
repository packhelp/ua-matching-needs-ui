import { useTranslations } from "../../../hooks/translations"
import dayjs from "dayjs"

export const useHousingLabels = () => {
  const translations = useTranslations()
  return {
    "a-night": translations.addTicket.date.nightOrTwo,
    "some-days": translations.addTicket.date.coupleOfDays,
    weeks: translations.addTicket.date.coupleOfWeeks,
    "no-idea": translations.addTicket.date.noIdea,
  }
}

export const TODAY = dayjs().format("YYYY-MM-DD")

export const useHousingOptions = () => {
  const labels = useHousingLabels()
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
        label: "a-night",
      },
      {
        value: dayjs().add(5, "day").format("YYYY-MM-DD"),
        label: "some-days",
      },
      {
        value: dayjs().add(2, "weeks").format("YYYY-MM-DD"),
        label: "weeks",
      },
      {
        value: "",
        label: "no-idea",
      },
    ].map((option) => ({
      ...option,
      description: labels[option.label],
    })),
  }
}
