import axios from "axios"

export const getMainTags = () => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/items/need_tag?filter[main_category][_eq]=1&fields=*.*.*`

  return axios.get(url).then((response) => response.data.data)
}
