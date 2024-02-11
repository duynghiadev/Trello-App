import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnDetailsAPI,
  fetchBoardDetailsAPI,
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix  cứng boardId, flow chuẩn chỉnh về sau khi học nâng cao trực tiếp vơi minh là chúng ta sẽ sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '65c6012844302cce96adbfec'
    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con (video 71 đã giải thích lý do ở phần Fix bug quan trọng)
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        // Khi F5 trang web thì cần xử lý vấn đề kéo thả vào một column rỗng (Nhớ lại video 37.2, code hiện tại là video 69)
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con (video 71 đã giải thích lý do ở phần Fix bug quan trọng)
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      console.log('Full board:', board)
      setBoard(board)
    })
  }, [])

  // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    console.log('createdColumn:', createdColumn)

    // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng (Nhó lại video 37.2, code hiện tại là video 69)
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật state board
    /**
     * - Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
     * - Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì Back-end sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này Front-end sẽ nhàn hơn
     */
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Func này có nhiệm vụ gọi API tạo mới Card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard:', createdCard)

    // Cập nhật state board
    /**
     * - Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
     * - Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì Back-end sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này Front-end sẽ nhàn hơn
     */
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    )

    if (columnToUpdate) {
      // Nếu column rỗng: bản chất là đang chứa một cái Placeholder card (Nhớ lại video 37.2, hiện tại là video 69)
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        console.log('👉 In Condition If:', columnToUpdate)
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Ngược lại Column đã có data thì push vào cuối mảng
        console.log('👉 In Condition Else:', columnToUpdate)
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    console.log('👉 ~ createNewCard ~ columnToUpdate:', columnToUpdate)
    setBoard(newBoard)
  }

  /**
   * - Func này có nhiệm vụ gọi API và xử lý khi kéo thả Column xong xuôi
   * - Chỉ cần gọi API để cập nhật mảng columnOrderIds của Board chứa nó (thay đổi vị trí trong mảng)
   */
  const moveColumns = (dndOrderedColumns) => {
    // Update cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API update Board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  /**
   * - Khi di chuyển card trong cùng Column:
   * - Chỉ cần gọi API để cập nhật mảng cardOrderIds của Column chứa nó (thay đổi vị trí trong mảng)
   */
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // Update cho chuẩn dữ liệu state Board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Gọi API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di chuyển card sang Column khác:
   * B1: Cập nhật mảng cardOrderIds của Board ban đầu chứa nó (Hiểu bản chất là xóa cái _id của Card ra khỏi mảng)
   * B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm _id của Card vào mảng)
   * B3: Cập nhật lại trường columnId mới của cái Card đã kéo
   * => Làm một API support riêng
   */
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    console.log(
      '🚀 ~ moveCardBetweenDifferentColumns ~ dndOrderedColumns:',
      dndOrderedColumns
    )
    console.log(
      '🚀 ~ moveCardBetweenDifferentColumns ~ nextColumnId:',
      nextColumnId
    )
    console.log(
      '🚀 ~ moveCardBetweenDifferentColumns ~ prevColumnId:',
      prevColumnId
    )
    console.log(
      '🚀 ~ moveCardBetweenDifferentColumns ~ currentCardId:',
      currentCardId
    )

    // Update cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API xử lý phía BE
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds

    console.log(
      '✅ moveCardBetweenDifferentColumns ~ prevCardOrderIds:',
      prevCardOrderIds
    )

    // Xử lý vấn đề khi kéo Card cuối cùng ra khỏi Column, Column rỗng sẽ có placeholder-card, cần xóa nó đi trước khi gửi dữ liệu lên cho phía BE. (Nhớ lại video 37.2)
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    console.log(
      '✅ moveCardBetweenDifferentColumns ~ prevCardOrderIds:',
      prevCardOrderIds
    )

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds
    })
  }

  // Xử lý xóa một Column và Cards bên trong nó
  const deleteColumnDetails = (columnId) => {
    console.log('🚀 ~ deleteColumnDetails ~ columnId:', columnId)
    // Update cho chuẩn dữ liệu state Board
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    )
    setBoard(newBoard)

    // Gọi API xử lý phía BE
    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult)
      console.log('🚀 ~ deleteColumnDetails ~ res:', res)
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh'
      }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
