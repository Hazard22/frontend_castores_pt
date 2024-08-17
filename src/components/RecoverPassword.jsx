import { Button, Card, Carousel, Flex, Form, Input, message, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { useForm } from 'antd/es/form/Form';
import NewPassword from './NewPassword';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../services/fetchServices';
const api_host = import.meta.env.VITE_API_HOST

export default function RecoverPassword() {

    const [form] = useForm()
    const navigate = useNavigate()

    const [loading, setloading] = useState(false)
    const carouselRef = useRef(null);
    const [credential, setCredential] = useState(null);

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next()
        }
    };

    const handleFormSubmit = async (values) => { 
        setloading(true)
        try {
            const response = await postRequest(
                `${api_host}/users/verify-code`,
                {'Content-Type': 'application/json',},
                values
            )
            if(response.status === 200){ 
                setloading(false)
                message.success('Codigo verificado con exito')
                setCredential(values.credential)
                handleNext()
            }
            else if (response.status === 404){
                message.warning('No existe usuario asignado a este nombre o correo')
                setloading(false)
            }
            else if(response.status === 403){
                message.warning('El codigo es incorrecto')
                setloading(false)
            }
            else{
                throw new Error('Error en login')
            }
        } catch (error) {
            message.error('Ha ocurrido un error')
            setloading(false)
        }
    }

    const handleSubmit = () => {  
        form.submit()
    }

    const handleReturnToLogin = () => { 
        navigate('/')
    }

    return (
        <Card
        title='Recuperar contraseña'
        style={{width:'40vh'}}
        extra={[
            <Button 
            onClick={handleReturnToLogin}
            danger type='primary'
            >
                Cancelar
            </Button>
        ]}
        >
            <Carousel
            dots={false}
            ref={carouselRef}
            >
                <div key='recover'>
                    <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    layout='vertical'
                    >
                        <Flex vertical justify='center' align='center'>
                            <Form.Item
                            name='credential'
                            label='Nombre de usuario o correo'
                            rules={[
                                {
                                required: true,
                                message: 'Por favor ingrese su nombre de usuario o correo',
                                },
                            ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                            name='security_code'
                            label='Codigo de seguridad'
                            rules={[
                                {
                                required: true,
                                message: 'Por favor ingrese su codigo de seguridad',
                                },
                            ]}
                            >
                                <Input.OTP 
                                length={4}
                                formatter={(str) => str.toUpperCase()} 
                                />
                            </Form.Item>
                            <Button 
                            onClick={handleSubmit}
                            type='primary'
                            loading={loading}
                            >
                                Recuperar contraseña
                            </Button>
                        </Flex>
                    </Form>
                </div>
                <div key='newpass'>
                    <NewPassword 
                    credential={credential}
                    />
                </div>
            </Carousel>
        </Card>
    )
}
