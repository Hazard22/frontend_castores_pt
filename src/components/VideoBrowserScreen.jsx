import { Button, Col, Flex, Input, Row, Space } from 'antd'
import React from 'react'

export default function VideoBrowserScreen() {
  return (
    <>
    <div
    style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100vw',
        height: '70px',
        zIndex: 1000, 
        borderBottom: '2px solid white',
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 20px',
        boxSizing: 'border-box' 
    }}
    >
        <div style={{ width: '100%' }}> 
            <Row>
                <Col span={4}>
                    <img src="/logo.png" alt="Logo" height={65} />
                </Col>
                <Col span={10}>
                    <Input.Search placeholder="Buscar..." style={{ flexGrow: 1, margin: '0 20px' }} />
                </Col>
                <Col offset={4} span={4}>
                    <p style={{ margin: 0 }}>Usuario</p>
                    <Button type='primary' danger>Cerrar sesión</Button>
                </Col>
            </Row>
        </div>
    </div>
    </>
  )
}
