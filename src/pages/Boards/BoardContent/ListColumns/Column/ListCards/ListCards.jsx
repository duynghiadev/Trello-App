import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box
      sx={{
        p: '0 5px', // padding
        m: '0 5px', // margin
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
       ${theme.trello.boardContentHeight} -
       ${theme.spacing(5)} -
       ${theme.trello.columnHeaderHeight} -
       ${theme.trello.columnFooterHeight}
     )`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#dfc2cf' }
      }}
    >
      <Card />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
      <Card temporaryHideMeta />
    </Box>
  )
}

export default ListCards
