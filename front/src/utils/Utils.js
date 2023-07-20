export const convertFromSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
  
    const hourString = hours > 0 ? `${hours}${hours > 1 ? '' : ''}` : ''
    const minuteString = minutes > 0 ? `${minutes}${minutes > 1 ? '' : ''}` : ''
    const secondString =
      remainingSeconds > 0 ? `${remainingSeconds}${remainingSeconds > 1 ? '' : ''}` : ''
  
    if (hours > 0) {
      return `${hourString} : ${minuteString || '0'} ${secondString && `: ${secondString}`}`
    } else if (!hours && minutes > 0) {
      return `${minuteString} ${secondString && `: ${secondString}`}`
    }
  
    return secondString;
  }