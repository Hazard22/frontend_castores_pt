import { Button, Card, Flex, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { postRequest } from '../services/fetchServices'
import { Link } from 'react-router-dom'
import SecurityCodeModal from './SecurityCodeModal'
const site_key = import.meta.env.VITE_SITE_KEY
const api_host = import.meta.env.VITE_API_HOST

export default function LoginScreen() {

    const [form] = useForm()
    const recaptchaRef = useRef(null);

    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleSubmit = () => {
        form.submit()
    }

    const handleFormSubmit = async (values) => { 

        try {
            values.recaptchaToken = recaptchaValue
            
            if (!recaptchaValue) {
                message.error('Por favor, completa el reCAPTCHA.');
                return;
            }
            const response =  await postRequest(
                `${api_host}/users/login`,
                {'Content-Type': 'application/json',},
                values
            )
            if(response.status === 200){
                message.success('Login exitoso')
                setRecaptchaValue(null);  
            }
            else if (response.status === 404){
                message.warning('No existe usuario asignado a este nombre o correo')
                setRecaptchaValue(null); 
                handleResetRecaptcha() 
            }
            else if(response.status === 403){
                message.warning('La contraseña es incorrecta')
                setRecaptchaValue(null); 
                handleResetRecaptcha() 
            }
            else{
                throw new Error('Error en login')
            }
        } catch (error) {
            message.error('Ha ocurrido un error')
            setRecaptchaValue(null); 
            handleResetRecaptcha() 
        }
        
    }

    const handleResetRecaptcha = () => { 
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    }
    
    const onRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    return (
        <Card
        style={{
            display: 'flex',
        }}
        >
            <img src='/logo.png'/>
            <Form form={form} onFinish={handleFormSubmit}>
                <Form.Item
                name='credential'
                label='Nombre de usuario o correo'
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
                name='password'
                label='Contraseña'
                labelCol={{span:24}}
                rules={[
                    {
                      required: true,
                      message: 'Por favor ingrese su contraseña',
                    },
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
                >
                    Ingresar
                </Button>
                <Link
                to='signup'
                >
                    ¿No tiene cuenta?, Cree una nueva
                </Link>
                <Link
                to='forgotten-pass'
                style={{color:'#911d1d'}}
                >
                    Olvide mi contraseña
                </Link>
            </Flex>
            </Form>
        </Card>
    )
}
