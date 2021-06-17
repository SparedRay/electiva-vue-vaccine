const handleError = (error: any) => {
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

const getBody = (body: any): any => {
  let str = body
  if (body?.data) {
    str = str.data
  }
  return str
}

export { handleError, getQueryString, getBody }