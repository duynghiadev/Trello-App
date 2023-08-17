import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Content
    </Box>
  )
}

export default BoardContent
