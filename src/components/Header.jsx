import { Box, Button, Text, Image } from '@skynexui/components';


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
                    src={`https://github.com/${username}.png`}
                />
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
           
                <Text variant='heading5'>
                    {username}
                </Text>
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

export default Header