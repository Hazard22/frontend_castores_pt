import { Button, Card, Flex, Form, Input, message, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { postRequest } from '../services/fetchServices'
import { Navigate, useNavigate } from 'react-router-dom'
import SecurityCodeModal from './SecurityCodeModal'
const { Title } = Typography
const site_key = import.meta.env.VITE_SITE_KEY
const api_host = import.meta.env.VITE_API_HOST

export default function SignUpScreen() {

    const [form] = useForm()
    const recaptchaRef = useRef(null);

    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [openSecurityCodeModal, setopenSecurityCodeModal] = useState(false);
    const [security_code, setsecurity_code] = useState(null)
    const [loadingSignUp, setloadingSignUp] = useState();

    const handleFormSubmit = async (values) => { 

        setloadingSignUp(true)
        
        try {
            values.recaptchaToken = recaptchaValue
            const response = await postRequest(
                `${api_host}/users/register`,
                {'Content-Type': 'application/json',},
                values
            )
            if(response.status === 200){
                const data = await response.json()
                setsecurity_code(data.security_code)
                message.success('Cuenta creada con exito')
                setloadingSignUp(false)
                setopenSecurityCodeModal(true)
            }
            else{
                throw new Error("Ha ocurrido un error")
            }
        } catch (error) {
            setloadingSignUp(false)
            message.error('Ha ocurrido un error')
            handleResetRecaptcha()
        }
    }

    const handleSubmit = () => {  
        form.submit()
    }

    const onRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleResetRecaptcha = () => { 
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    }

    return (
        <>
        <Card
        style={{
            display: 'flex',
        }}
        >
            <Flex justify='center'>
                <Title>Crear cuenta nueva</Title>
            </Flex>
            <Form form={form} onFinish={handleFormSubmit}>
                <Flex gap={8}>
                    <Form.Item
                    name='name'
                    label='Nombre'
                    labelCol={{span:24}}
                    rules={[
                        {
                        required: true,
                        message: 'Por favor un nombre',
                        },
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                    name='lastname'
                    label='Apellido'
                    labelCol={{span:24}}
                    rules={[
                        {
                        required: true,
                        message: 'Por favor ingrese un apellido',
                        },
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                </Flex>
                <Form.Item
                name='username'
                label='Nombre de usuario'
                labelCol={{span:24}}
                rules={[
                    {
                    required: true,
                    message: 'Por favor ingrese su nombre de usuario o correo',
                    },
                ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                name='email'
                label='Dirección de correo'
                labelCol={{span:24}}
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingrese su nombre de usuario o correo',
                    },
                    {
                        type: 'email',
                        message: 'La dirección de correo no es valida',
                    },
                ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                name='password'
                label='Contraseña'
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
                label='Confirmar contraseña'
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
                <Flex vertical align='center' justify='center' gap={8}>
                    <Form.Item>
                        <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={site_key}
                        onChange={onRecaptchaChange}
                        />
                    </Form.Item>
                    <Button 
                    type='primary'
                    onClick={handleSubmit}
                    loading={loadingSignUp}
                    disabled={loadingSignUp}
                    >
                        Crear cuenta
                    </Button>
                </Flex>
            </Form>
        </Card>
        <SecurityCodeModal
        open={openSecurityCodeModal}
        setOpen={setopenSecurityCodeModal}
        code={security_code}
        />
        </>
    )
}
