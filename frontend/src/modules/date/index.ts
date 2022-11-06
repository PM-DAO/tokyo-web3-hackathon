export const DAYS_OF_WEEK_ARRAY = [
  {
    number: 0,
    name: 'Sunday'
  },
  {
    number: 1,
    name: 'Monday'
  },
  {
    number: 2,
    name: 'Tuesday'
  },
  {
    number: 3,
    name: 'Wednesday'
  },
  {
    number: 4,
    name: 'Thursday'
  },
  {
    number: 5,
    name: 'Friday'
  },
  {
    number: 6,
    name: 'Saturday'
  }
] as const

export const getDaysOfWeek = (daysOfWeekNumber: number) => {
  return DAYS_OF_WEEK_ARRAY.find((dayOfWeek) => dayOfWeek.number === daysOfWeekNumber)?.name
}

export const getCurrentDate = () => {
  // #NOTE: default time zone: JST
  const currentDate = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000)

  const currentHour = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()
  const currentDaysOfWeekNumber = currentDate.getDay()

  return {
    currentDaysOfWeekNumber,
    currentHour,
    currentMinutes
  }
}
