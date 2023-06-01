import React, { useContext, useEffect, useState } from 'react'
import { IoNotificationsOutline, IoNotifications } from 'react-icons/io5'
import { BsBell } from 'react-icons/bs'
import ToolTip from 'src/components/ToolTip'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import { AppContext } from 'src/context/app.context'
import { convertToRelativeTime } from 'src/utils/utils'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import videoApi from 'src/api/video.api'
import { setProfileToLocalStorage } from 'src/utils/auth'
import classNames from 'classnames'

const Inform = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false)
  const { profile, setProfile } = useContext(AppContext)
  const informRef = React.useRef<HTMLDivElement>(null)
  const [totalInForm, setTotalInForm] = useState<number>(0)
  useOnClickOutside(informRef, () => setIsShow(false))

  const navigate = useNavigate()

  const updateSeenNotificationMutation = useMutation({
    mutationFn: videoApi.updateSeenNotificationMutation,
    onSuccess: (data) => {
      setProfileToLocalStorage(data.data.data)
      setProfile(data.data.data)
    }
  })

  useEffect(() => {
    if (profile?.notification) {
      const total = profile?.notification?.reduce((total, item) => {
        if (item.seen === false) {
          return total + 1
        }
        return total
      }, 0)
      setTotalInForm(total)
    }
  }, [profile?.notification])

  const handleClick = (item: any) => {
    setIsShow(false)
    updateSeenNotificationMutation.mutate({
      video: item?.id
    })
    navigate(`/detail/${item.id}?category=1`)
  }

  return (
    <>
      <ToolTip position='bottom' content={'Thông báo'}>
        <div
          className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
          onClick={() => setIsShow(!isShow)}
          ref={informRef}
          role='presentation'
        >
          {isShow ? (
            <>
              <IoNotifications className='pointer-events-none h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </>
          ) : (
            <>
              <IoNotificationsOutline className='pointer-events-none h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </>
          )}
          {totalInForm > 0 && (
            <span className='absolute top-2 right-1 flex h-[13px] w-[16px] items-center justify-center rounded-xl bg-red-600  text-[11px] font-bold text-white'>
              {totalInForm > 9 ? '9+' : totalInForm}
            </span>
          )}
          {isShow && (
            <div
              className='absolute top-12 right-0 z-40 flex h-[530px] w-[400px] flex-col rounded-xl bg-white shadow transition-all ease-linear dark:bg-[#282828]'
            >
              <span className='p-4 text-left text-base text-black dark:text-white'>Thông báo</span>
              <div className='w-full border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.2)]'></div>
              {profile?.notification?.length === 0 && (
                <div className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
                  <BsBell className='h-28 w-28 text-[#909090] dark:text-[#717171] ' />
                  <span className='text-base font-semibold text-[#6a6a6a]'>Thông báo hiển thị ở đây</span>
                </div>
              )}
              <div className='overflow-y-scroll'>
                {profile?.notification?.map((item, index) => (
                  <div
                    className={classNames('flex items-center py-4 pr-4 hover:bg-[#F2F2F2] dark:hover:bg-[#3E3E3E]')}
                    key={index}
                    role='presentation'
                    onClick={() => handleClick(item.video)}
                  >
                    <div className='flex h-full w-12 justify-center'>
                      <div
                        className={`${
                          item.seen == true ? 'opacity-0' : 'opacity-1'
                        } h-[0.3rem] w-[0.3rem]  rounded-full bg-blue-600 dark:bg-blue-400`}
                      ></div>
                    </div>
                    <img
                      src={item.channel.avatar}
                      alt='avatar'
                      className='mr-4 h-12 w-12 flex-shrink-0 rounded-full border object-cover shadow-sm'
                    />
                    <div className='flex w-full flex-col items-start'>
                      <span className='w-32 break-words text-xs font-semibold text-black line-clamp-2 dark:text-white md:text-sm'>
                        {item.video.title}
                      </span>
                      <span className='text-xs text-[#606060] dark:text-[#aaa] '>
                        {convertToRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <img src={item.video.thumbnail} alt='thumbnail' className='mx-4 h-14 w-24 flex-shrink-0 rounded' />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* {isShow && (
          <div
            className='absolute top-12 right-0 z-40 flex h-[530px] w-[400px] flex-col rounded-xl bg-white shadow transition-all ease-linear dark:bg-[#282828]'
            // ref={informRef}
            // onClick={() => setIsShow(!isShow)}
          >
            <span className='p-4 text-left text-base text-black dark:text-white'>Thông báo</span>
            <div className='w-full border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.2)]'></div>
            {profile?.notification?.length === 0 && (
              <div className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
                <BsBell className='h-28 w-28 text-[#909090] dark:text-[#717171] ' />
                <span className='text-base font-semibold text-[#6a6a6a]'>Thông báo hiển thị ở đây</span>
              </div>
            )}
            <div className='overflow-y-scroll'>
              {profile?.notification?.map((item, index) => (
                <div
                  className={classNames('flex items-center py-4 pr-4 hover:bg-[#F2F2F2] dark:hover:bg-[#3E3E3E]')}
                  key={index}
                  role='presentation'
                  onClick={() => handleClick(item.video)}
                >
                  <div className='flex h-full w-12 justify-center'>
                    <div
                      className={`${
                        item.seen == true ? 'opacity-0' : 'opacity-1'
                      } h-[0.3rem] w-[0.3rem]  rounded-full bg-blue-600 dark:bg-blue-400`}
                    ></div>
                  </div>
                  <img
                    src={item.channel.avatar}
                    alt='avatar'
                    className='mr-4 h-12 w-12 flex-shrink-0 rounded-full border object-cover shadow-sm'
                  />
                  <div className='flex w-full flex-col items-start'>
                    <span className='w-32 break-words text-xs font-semibold text-black line-clamp-2 dark:text-white md:text-sm'>
                      {item.video.title}
                    </span>
                    <span className='text-xs text-[#606060] dark:text-[#aaa] '>
                      {convertToRelativeTime(item.createdAt)}
                    </span>
                  </div>
                  <img src={item.video.thumbnail} alt='thumbnail' className='mx-4 h-14 w-24 flex-shrink-0 rounded' />
                </div>
              ))}
            </div>
          </div>
        )} */}
      </ToolTip>
    </>
  )
}

export default Inform
