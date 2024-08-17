import { Button, Flex, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { patchRequest } from '../services/fetchServices';
const api_host = import.meta.env.VITE_API_HOST

export default function NewPassword({ credential }) {

    const [form] = useForm()
    const navigate = useNavigate()

    const [loading, setloading] = useState(false)

    const handleFormSubmit = async (values) => { 
          setloading(true)
          try {
            const response = await patchRequest(
                `${api_host}/users/update-pass`,
                {'Content-Type': 'application/json',},
                values
            )
            if(response.status === 200){ 
                setloading(false)
                message.success('Contraseña actualizada con exito')
                navigate('/')
            }
            else{
                throw new Error('Ha ocurrido un error')
            }
          } catch (error) {
            console.log(error);
            message.error('Ha ocurrido un error')
            setloading(false)
          }
    }

    const handleSubmit = () => {  
        form.submit()
    }

    useEffect(() => {
        
        form.setFieldsValue({
            credential
        })
    }, [credential]);

    return (
        <Form form={form} onFinish={handleFormSubmit}>
            <Flex vertical justify='center' align='center' gap={6}>
                <Form.Item
                name='credential'
                labelCol={{span:24}}
                rules={[
                    {
                    required: true,
                    },
                ]}
                hidden
                >
                    <Input value={credential}/>
                </Form.Item>
                <Form.Item
                name='password'
                label='Nueva contraseña'
                labelCol={{span:24}}
                rules={[
                    {
                    required: true,
                    message: 'Por favor ingrese su contraseña',
                    },
                ]}
                hasFeedback
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                name='confirmation'
                label='Confirmar nueva contraseña'
                labelCol={{span:24}}
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                    required: true,
                    message: 'Por favor ingrese su contraseña',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                            }
                            return Promise.reject(new Error('Las contraseñas no coinciden'));
                        },
                    }),
                ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Button
                onClick={handleSubmit}
                type='primary'
                loading={loading}
                >
                    Confirmar
                </Button>
            </Flex>
        </Form>
        
    )
}
