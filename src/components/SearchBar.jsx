import { Button, Col, Dropdown, Flex, Input, Row, Space } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ user, loading, setsearched }) {

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

    const handleLogOut = () => {  
        navigate('/')
    }

    const items = [
        {
          key: '1',
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
