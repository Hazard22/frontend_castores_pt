import { Button, Col, Dropdown, Flex, Input, message, Row, Space } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    LogoutOutlined,
    HeartFilled
  } from '@ant-design/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../services/fetchServices";
const api_host = import.meta.env.VITE_API_HOST

export default function SearchBar({ user, loading, setsearched, setvideos }) {

    const navigate = useNavigate()

    const [searchedValue, setsearchedValue] = useState(null);

    const handleSearchValue = (e) => {
        setsearchedValue(e.target.value)
    }

    const handleSearch = () => { 
        if(searchedValue !== ""){
            setsearched(searchedValue);
            
        }
    }

    const handleSearchFavorites = async () => {  
            setvideos(null)
            try {
                const response = await getRequest(
                    `${api_host}/videos/favorites`,
                    {'Content-Type': 'application/json',},
                )
                if(response.status === 200){
                    const data = await response.json()
                    
                    setvideos(data)
                }
                else{
                    throw new Error('Ha ocurrido un error')
                }
            } catch (error) {
                message.error('Ha ocurrido un error')
            }
    }

    const handleLogOut = () => {  
        navigate('/')
    }

    const items = [
        {
            key: '1',
            label: 'Favoritos',
            icon:<HeartFilled/>,
            onClick:handleSearchFavorites
        },
        {
            key: '2',
            label: 'Cerrar sesión',
            icon:<LogoutOutlined/>,
            danger:true,
            onClick:handleLogOut
          },
    ];
    
    return (
        <Row>
            <Col offset={1} span={3}>
                <Flex 
                align="center" 
                justify="center"
                style={{
                    width:'100%'
                }}
                >
                    <img src="/logo-small.png" width='100%'/>
                </Flex>
            </Col>
            <Col 
            span={16} 
            >
                <Flex 
                align="center" 
                justify="center"
                style={{
                    width:'100%'
                }}
                >
                    <Space.Compact
                    style={{
                        width:'80%'
                    }}
                    >
                        <Input
                        onChange={handleSearchValue}
                        onPressEnter={handleSearch}
                        placeholder="Buscar videos"
                        />
                        <Button 
                        loading={loading}
                        onClick={handleSearch}
                        type="primary" 
                        icon={<SearchOutlined/>}/>
                    </Space.Compact>
                </Flex>
            </Col>
            <Col span={4}>
                <Flex 
                align="center" 
                justify="center"
                style={{
                    width:'100%'
                }}
                >
                    <Dropdown
                    menu={{
                    items,
                    }}
                    placement="bottom"
                    >
                        <Button icon={<UserOutlined/>}>{user.username}</Button>
                    </Dropdown>
                </Flex>
            </Col>
        </Row>
    )
}
