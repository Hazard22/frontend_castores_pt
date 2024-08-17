import { Button, Flex, Modal, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography

export default function SecurityCodeModal({ open, setOpen, code }) {

  const navigate = useNavigate()

  const onOk = () => {  
    setOpen(false)
    navigate('/')
  }


  return (
    <Modal
    title='CODIGO DE SEGURIDAD'
    open={open}
    closable={false}
    footer={[
      <Button 
      type='primary'
      onClick={onOk}
      >
        Ir a iniciar sesión
      </Button>
    ]}
    >
        <Flex vertical justify='center' align='center'>
          <Title>{code}</Title>
          <Text
          strong
          >
            Guarde este codigo ya que es unico y sera requerido en caso de olvidar su contraseña
          </Text>
        </Flex>
    </Modal>
  )
}
