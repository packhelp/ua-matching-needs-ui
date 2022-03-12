import dayjs from "dayjs"

export const housingLabels = {
  "a-night": "A night or two",
  "some-days": "A couple of days",
  weeks: "A couple of weeks",
  "no-idea": "No idea",
}

export const housingUntilOptions = [
  {
    value: dayjs().add(2, "day").format("YYYY-MM-DD"),
    label: "a-night",
    description: housingLabels["a-night"],
  },
  {
    value: dayjs().add(5, "day").format("YYYY-MM-DD"),
    label: "some-days",
    description: housingLabels["some-days"],
  },
  {
    value: dayjs().add(2, "weeks").format("YYYY-MM-DD"),
    label: "weeks",
    description: housingLabels["weeks"],
  },
  { value: "", label: "no-idea", description: housingLabels["no-idea"] },
]

export const housingFromOptions = [
  { value: dayjs().format("YYYY-MM-DD"), label: "Today" },
  { value: dayjs().add(1, "day").format("YYYY-MM-DD"), label: "Tomorrow" },
]
export const TODAY = dayjs().format("YYYY-MM-DD")
