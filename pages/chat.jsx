import { Box, Button, TextField } from '@skynexui/components';
import appConfig from '../config.json';
import { useState, useEffect } from 'react'
import supabaseClient from '../service/api'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import MessageList from '../src/components/MessageList'
import Header from '../src/components/Header'
import { useRouter } from 'next/router'
function escutaMensagemEmTempoReal(criarMensagem){
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (dados) =>{
            criarMensagem(dados.new)
        })
        .subscribe();
}


function PaginaDoChat() {
    const roteamento = useRouter()
    let username = roteamento.query.username
    const [mensagem, setMensagem] = useState('')
    const [listaMensagem, setListaMensagem] = useState([])
    if(username===''){username='Anonimo(a)'}
    const mostrarMensagen = () => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false})
            .then(({ data }) => {
                setListaMensagem(data)
            })
    }

    const adicionarMensagem = (mensagem) => {
        const dados = {
            from: username,
            mensage: mensagem
        }
        supabaseClient.from('mensagens').insert([
            dados
        ]).then(({ data }) => {
            console.log(data)
        })

    }

    useEffect(() => {
        mostrarMensagen()
        escutaMensagemEmTempoReal((dados)=>{
            setListaMensagem((valorAtual)=>{
               return [dados, ...valorAtual]
            })
        })
    }, [])

    return (
        <Box
            styleSheet={{

                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://wallpaper.dog/large/20495729.png)`,
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
                    backgroundColor: appConfig.theme.colors.transparente.fundo,
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
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messagemLista={listaMensagem}/>

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
                                            adicionarMensagem(mensagem)
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
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                adicionarMensagem(':sticker: ' + sticker)
                            }}
                        />
                        <Button
                            type='button'
                            label='Entrar'
                            disabled={mensagem.trim() != '' ? false : true}
                            onClick={(e) => {
                                adicionarMensagem(mensagem)
                                console.log(mensagem)
                                setMensagem('')
                            }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.transparente.buttonRed,
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.transparente.fundo,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}




export default PaginaDoChat;