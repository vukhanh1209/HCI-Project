import AsideBar from './components/AsideBar'
import ListFilter from './components/ListFilter'
import VideoList from './components/VideoList'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/context/app.context'
import { Helmet } from 'react-helmet-async'

const categoryAPI = [
  {
    id: '1',
    name: 'Tất cả'
  },
  {
    id: '647e206f102d656559afa622',
    name: 'Khoa học và Công nghệ'
  },
  {
    id: '647e20a1102d656559afa623',
    name: 'Tin tức và sự kiện'
  },
  {
    id: '647e20b5102d656559afa624',
    name: 'Đời sống'
  },
  {
    id: '647e20c1102d656559afa625',
    name: 'Thể thao'
  },
  {
    id: '647e20cc102d656559afa626',
    name: 'Giải trí'
  },
  {
    id: '647e20d5102d656559afa627',
    name: 'Âm nhạc'
  }
]
const HomePage = () => {
  const body = document.querySelector('body')
  const { showSideBar } = useContext(AppContext)
  const [filter, setFilter] = useState<string>('1')

  useEffect(() => {
    if (showSideBar) {
      disableBodyScroll(body as HTMLElement)
    } else {
      enableBodyScroll(body as HTMLElement)
    }
  }, [body, showSideBar])

  return (
    <>
      <Helmet>
        <title>Trang chủ - HciTube</title>
        <meta name='description' content='Trang chủ - HciTube' />
      </Helmet>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />

        <div className={`mb-16 flex h-full w-full flex-col 2xl:pl-64`}>
          <ListFilter dataCategories={categoryAPI} filter={filter} setFilter={setFilter} />
          <VideoList filter={filter} />
        </div>
      </div>
    </>
  )
}

export default HomePage
