import dayjs from "dayjs"

export const housingUntilOptions = [
  {
    value: dayjs().add(2, "day").format("YYYY-MM-DD"),
    label: "A night or two",
  },
  {
    value: dayjs().add(5, "day").format("YYYY-MM-DD"),
    label: "A couple of days",
  },
  {
    value: dayjs().add(2, "weeks").format("YYYY-MM-DD"),
    label: "A couple of weeks",
  },
  { value: "", label: "No idea" },
]

export const housingFromOptions = [
  { value: dayjs().format("YYYY-MM-DD"), label: "Today" },
  { value: dayjs().add(1, "day").format("YYYY-MM-DD"), label: "Tomorrow" },
]
export const TODAY = dayjs().format("YYYY-MM-DD")
