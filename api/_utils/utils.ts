const handleError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      data: {
        message: 'Error',
        data: error.response.data
      }
    }
  } else if (error.request) {
    return {
      status: 500,
      data: {
        message: 'Error while building request'
      }
    }
  } else {
    return {
      status: 500,
      data: {
        message: error.message
      }
    }
  }
}

const getQueryString = (query: string | string[]): string => {
  let str = query
  if (Array.isArray(str)) {
    str = str[0]
  }
  return str
}

export { handleError, getQueryString }