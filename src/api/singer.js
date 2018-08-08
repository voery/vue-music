import axios from '_axios@0.18.0@axios'
import {HOST} from 'common/js/config'

export function getSingers () {
  const url = HOST + '/top/artists?limit=1000'

  return axios.get(url)
}

export function getSingerDetail (singerId) {
  const url = HOST + `/artists?id=${singerId}`

  return axios.get(url)
}

export function getMusic (musicId) {
  const url = HOST + `/music/url?id=${musicId}`

  return axios.get(url)
}
