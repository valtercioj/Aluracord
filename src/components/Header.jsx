import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';


function Header({username}) {
    return (
        <>
             <Image
                    styleSheet={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '2px',
                    }}
                    src={username !== 'Anonimo(a)'
                    ?
                    `https://github.com/${username}.png`
                    
                    :
                    'https://cdn.pixabay.com/photo/2014/04/02/16/27/guy-307320_960_720.png'
                    }
                />
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
           
                <Text variant='heading5'>
                    {username}
                </Text>
               <Image  
               src='https://logosmarcas.net/wp-content/uploads/2021/08/Akatsuki-Logo.png'
               styleSheet={{
                width: '60px',
                height: '45px',
                
                display: 'inline-block',
                marginRight: '2px',
            }}
               />
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    styleSheet={{
                        hover:{backgroundColor:appConfig.theme.colors.transparente.buttonRed}
                    }}
                />
            </Box>
        </>
    )
}

export default Header