import React, { useEffect, useState } from 'react'
import { Layout, message, Spin } from 'antd'
import SearchBar from './SearchBar';
import VideoGallery from './VideoGallery';
import { getRequest } from '../services/fetchServices';
import useUser from '../hooks/useUser';
const { Header, Content } = Layout;
const api_host = import.meta.env.VITE_API_HOST

export default function Home() {

    const { user, loading, error } = useUser();
    const [loadingSearch, setloadingSearch] = useState(false);
    const [videos, setvideos] = useState(null);
    const [searched, setsearched] = useState();

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        padding:12,
        lineHeight: '64px',
        backgroundColor: '#1f1e1d',
        borderBottom: '2px solid white',
    };
    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#1f1e1d',
    };
    const layoutStyle = {
        //overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1f1e1d',
    };

    useEffect(() => {
        
        const fetchVideos = async () => {
            setloadingSearch(true)
            setvideos(null)
            try {
                const response = await getRequest(
                    `${api_host}/videos?searched=${searched}`,
                    {'Content-Type': 'application/json',},
                )
                if(response.status === 200){
                    const data = await response.json()
                    setvideos(data)
                    setloadingSearch(false)
                }
                else{
                    throw new Error('Ha ocurrido un error')
                }
            } catch (error) {
                message.error('Ha ocurrido un error')
                setloadingSearch(false)
            }
        }

        if(searched){
            fetchVideos()
        }

    }, [searched]);

    return (
        <>
            {(loading) ? (
                <Spin spinning tip={`Loading: ${loading} Error: ${error}`}/>
            ) : (
                user && (
                    <Layout style={layoutStyle}>
                        <Header style={headerStyle}>
                            <SearchBar
                            user={user}
                            loading={loadingSearch}
                            setsearched={setsearched}
                            setvideos={setvideos}
                            />
                        </Header>
                        <Content style={contentStyle}>
                            {videos && (
                                <VideoGallery
                                videos={videos}
                                />
                            )}
                        </Content>
                    </Layout>
                )
            )}
        </>
    )
}
