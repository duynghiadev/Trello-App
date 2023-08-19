/**
 * Created by trungquandev.com's author on March 28, 2021
 * Updated by trungquandev.com's author on Jun 28, 2023
 * ---
 * Order an array of objects based on another array & return new Ordered Array
 * The original array will not be modified.
 * ---
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * For Vietnamese with love :D
 * Xác định các phần tử trong array gốc ban đầu (originalArray) xem nó nằm ở đâu trong array thứ 2 (orderArray) (là array mà mình dùng để sắp xếp) bằng cách tìm index (indexOf) rồi sẽ sắp xếp theo index đó bằng hàm sort của Javascript.
 */

export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  /**
   * 🚀 Đây là cách viết ngắn gọn dễ hiểu
   */

  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))

  /**
   * 🚀 Đây là cách viết dài dòng. Nhưng mà thuật toán này khó đấy. Cố gắng hiểu nhé!!
   */

  // const clonedArray = [...originalArray]
  // const orderedArray = clonedArray.sort((a, b) => {
  //   return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  // })
  // return orderedArray
}
