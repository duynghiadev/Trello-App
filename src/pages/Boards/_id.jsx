import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI
} from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix  cứng boardId, flow chuẩn chỉnh về sau khi học nâng cao trực tiếp vơi minh là chúng ta sẽ sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '65c6012844302cce96adbfec'
    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => {
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

    // Cập nhật state board
  }

  // Func này có nhiệm vụ gọi API tạo mới Card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard:', createdCard)

    // Cập nhật state board
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
      />
    </Container>
  )
}

export default Board
