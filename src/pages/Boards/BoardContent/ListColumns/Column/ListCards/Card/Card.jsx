import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import GroupIcon from '@mui/icons-material/Group'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Card({ temporaryHideMeta }) {
  if (temporaryHideMeta) {
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev-scaled.jpg'
        title='green iguana'
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>TrungQuanDev MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size='small' startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size='small' startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size='small' startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
