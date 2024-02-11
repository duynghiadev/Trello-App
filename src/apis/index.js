import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/**
 * Lưu ý: Đối với việc sử dụng axios ở khóa MERN Stack Pro trên kênh Youtube: TrungQuanDev - Một lập trình viên
 *
 * - Tất cả các function bên dưới các bạn chỉ thấy mình request và lấy data từ response luôn, mà không có try catch hay then catch gì để bắt lỗi
 * - Lý do là vì ở phía Front-end chúng ta không cần thiết làm như vậy đối với mọi request bởi nó sẽ gây ra việc dư thừa code catch lỗi quá nhiều
 * - Giải pháp Clean Code gọn gàng đó là chúng ta sẽ catchh lỗi tập trung tại một nơi bằng cách tận dụng một thứ cực kỳ mạnh mẽ trong axios đó là interceptors
 * - Hiểu đơn giản Interceptors là cách mà chúng ta sẽ dhh chặn vào giữa request hoặc response để xử lý logic mà chúng ta muốn
 * (Và ở học phần MERN Stack Advance nâng cao học trực tiếp mình sẽ dạy cực kỳ đầy đủ cách xử lý, áp dụng phần này chuẩn chinh cho các bạn)
 */

/** Boards **/
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Lưu ý: axios sẽ trả về kết quả về qua property của nó là data
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  )
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  )
  return response.data
}

/** Columns **/
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  )
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

/** Cards **/
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
