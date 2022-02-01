import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

function ImageSharingan({img}){
  return (
    <Image
          src={img}
          styleSheet={{
            maxWidth: '50px',
            maxHeight: '50px',
            background:'cover',
          }}
      />
  )
}

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');
  const [isImg, setOpenImg] = React.useState(true);
  const imgSharigan = 'http://naruto-shippuden-revolution.weebly.com/uploads/1/8/4/5/18450513/783142138.png'

  const imgmMangekyou = 'https://i.pinimg.com/originals/59/1f/96/591f966883483a02ed6fcb4cebbf987a.png'
  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
      
        styleSheet={{
          borderRadius: '50%',
          maxWidth: '50px',
          maxHeight: '50px',
          fontSize: '20px',
          margin: '0 8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'red',
        }}
        label={isImg? (< ImageSharingan img={imgSharigan}/>): (< ImageSharingan img={imgmMangekyou}/>)}
          

        onClick={() => {setOpenState(!isOpen) && setOpenImg(!isImg)}}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            right: '30px',
            bottom: '30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflow: 'scroll',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  }
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}