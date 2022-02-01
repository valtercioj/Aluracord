import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json';
import {useState} from 'react'

function MessageList({ messagemLista }) {

    const [deleteMensagem, setDeleteMensagem] = useState(false)

    return (
        <>
            <Box
                tag="ul"
                styleSheet={{
                    overflow: 'scroll',
                    display: 'flex',

                    flexDirection: 'column-reverse',
                    flex: 1,
                    color: appConfig.theme.colors.neutrals["000"],
                    marginBottom: '16px',
                }}
            >
                {messagemLista.map((mensagem) => {
                    return (
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }

                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',

                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.from}.png`}
                                />
                                <Text tag="strong">
                                    {mensagem.from}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            {mensagem.mensage.startsWith(':sticker:')
                                ? (
                                    <Image src={mensagem.mensage.replace(':sticker:', '')} 
                                    styleSheet={{

                                        maxWidth: '350px',
                                        maxHeight: '350px',
                                       
                                      }}
                                    />
                                )
                                : (
                                    mensagem.mensage
                                )}
                            
                        </Text>

                    )
                })}

            </Box>

        </>

    )
}

export default MessageList