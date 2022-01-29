import { Box, Button, TextField} from '@skynexui/components';
import appConfig from '../config.json';
import { useState, useEffect } from 'react'
import supabaseClient from '../service/api'
import MessageList from '../src/components/MessageList'
import Header from '../src/components/Header'
import { useRouter } from 'next/router'

function PaginaDoChat() {
    const roteamento = useRouter()
    const username = roteamento.query.username
    const [mensagem, setMensagem] = useState('')
    const [listaMensagem, setListaMensagem] = useState([])
    
    const mostrarMensagen=()=>{
        supabaseClient
            .from('mensagens')
            .select('*')
            .then(({ data }) => {
                setListaMensagem(data)
            })
    }
    
    const adicionarMensagem = () => {
        const dados = {
            from: username,
            mensage: mensagem
        }
        supabaseClient.from('mensagens').insert([
            dados
        ]).then(({ data }) => {
            setListaMensagem([data[0], ...listaMensagem])
        })
    
    }

    useEffect(() => {
        mostrarMensagen()
    }, [])

    return (
        <Box
            styleSheet={{

                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://c.wallhere.com/photos/9a/01/1920x1080_px_computer_cyberpunk_Futuristic_Interfaces-833179.jpg!d)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',

                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '85%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header username={username} />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messagemLista={listaMensagem} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            value={mensagem}
                            onChange={(e) => { setMensagem(e.target.value) }}
                            onKeyPress={
                                (e) => {
                                    if (e.key === "Enter") {
                                        if (mensagem.trim() != '') {

                                            e.preventDefault()
                                            adicionarMensagem()
                                            setMensagem('')
                                        }
                                    }
                                }
                            }
                            styleSheet={{
                                width: '100%',
                                border: '1px solid #00cae0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',

                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            type='button'
                            label='Enviar'
                            disabled={mensagem.trim() != ''? false : true}
                            onClick={(e) => {

                                adicionarMensagem()
                                setMensagem('')
                            }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}




export default PaginaDoChat;
