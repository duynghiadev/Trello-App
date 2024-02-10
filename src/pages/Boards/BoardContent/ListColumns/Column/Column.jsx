import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddCardIcon from '@mui/icons-material/AddCard'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Column({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    /**
     * touchAction: 'none', // Dành cho sensor default dạng PointerSensor
     * Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch
     * https://github.com/clauderic/dnd-kit/issues/117
     */
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn max 100% vì nếu không sẽ lỗi nếu không có column ngắn qua một cái column dài thì phải kéo ở khu vực giữa giữa rất khó chịu (demo ở video 32). Lưu ý lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh.
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = () => {
    if (!newCardTitle) {
      // console.error('Please enter Card Title')
      return
    }
    // console.log('newCardTitle:', newCardTitle)
    // Gọi API ở đây...

    // Đóng trạng thái thêm Card mới & Clear Input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ có bug kiểu kiểu flickering (video 32)
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box Column Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignIems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {column?.title}
          </Typography>

          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘C
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘V
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Remove Archive this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* List Cards */}
        <ListCards cards={orderedCards} />

        {/* Box Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                startIcon={<AddCardIcon />}
                onClick={toggleOpenNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                label='Enter card title...'
                type='text'
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd='true'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': {
                    color: 'text.primary'
                  },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Button
                  onClick={addNewCard}
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main
                    }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer'
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
