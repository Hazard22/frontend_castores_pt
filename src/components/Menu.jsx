import { Button, Flex, Space, Typography } from "antd";
const { Title } = Typography
import {
    LogoutOutlined
  } from '@ant-design/icons';

export default function Menu() {

    
    return (
        <Flex
        align="center"
        justify="center"
        >
            <Space 
            direction="vertical"
            style={{ width:'50%'}}
            >
                <Title level={5}>Usuario</Title>
                <Button 
                type="primary" 
                danger
                icon={<LogoutOutlined />}
                >
                    Cerrar sesión
                </Button>
            </Space>
        </Flex>
    )
}
