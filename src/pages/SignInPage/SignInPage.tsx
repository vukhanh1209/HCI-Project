import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { BsYoutube } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { loginSchemaType, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import authApi from 'src/api/auth.api'
import { AppContext } from 'src/context/app.context'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { getAccessTokenFromLocalStorage } from 'src/utils/auth'
import { Helmet } from 'react-helmet-async'

type FormData = loginSchemaType
const loginSchema = schema.pick(['email', 'password'])
const SignInPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const { setIsVerify, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        if (getAccessTokenFromLocalStorage() === '') {
          setIsVerify('1')
          navigate(path.verify)
        } else {
          setIsVerify('2')
          setProfile(() => data.data.data.user)
          navigate(path.home)
        }
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.message
          setError('password', { type: 'custom', message: formError })
        }
      }
    })
  })

  return (
    <>
      <Helmet>
        <title>Trang đăng nhập - HciTube</title>
        <meta name='description' content='Trang đăng nhập - HciTube' />
      </Helmet>
      <div className='mx-auto flex h-screen w-64 flex-col justify-center gap-y-5 md:w-96'>
        <Link to={path.home} className='flex flex-col items-center'>
          <BsYoutube className='h-16 w-16 text-red-600 md:h-24 md:w-24' />
          <div className='flex items-end gap-x-1'>
            <span className='text-lg font-semibold text-black dark:text-white md:text-2xl'>Chào mừng bạn đến</span>
            <span className='dynamic text-lg font-semibold text-red-600 after:bg-white dark:after:bg-[#0f0f0f] md:text-2xl'>
              HciTube
            </span>
          </div>
        </Link>
        <form className={`flex w-full flex-col`} noValidate onSubmit={onSubmit} autoComplete='false'>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label
              htmlFor='email'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              Email:
            </label>
            <Input
              name='email'
              type='text'
              register={register}
              placeholder='Mời nhập email của bạn'
              id='email'
              errorMessage={errors.email?.message}
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-64 dark:bg-transparent text-black dark:text-white md:w-96 md:placeholder:text-sm outline-none text-xs md:text-sm'
            />
          </div>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label
              htmlFor='password'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              Mật khẩu
            </label>
            <Input
              name='password'
              type='password'
              register={register}
              placeholder='Mời nhập mật khẩu của bạn'
              errorMessage={errors.password?.message}
              id='password'
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-64 dark:bg-transparent text-black dark:text-white md:w-96 md:placeholder:text-sm outline-none text-xs md:text-sm'
            />
          </div>
          <Link
            to={path.forgotPassword}
            className='cursor-pointer text-center text-xs font-semibold text-black underline dark:text-white md:text-sm'
          >
            Quên mật khẩu
          </Link>

          <Button
            className='mt-3 w-full rounded-lg bg-blue-600 p-2 text-xs font-semibold text-white md:text-sm'
            type='submit'
            isLoading={loginMutation.isLoading}
            disabled={loginMutation.isLoading}
          >
            Đăng nhập
          </Button>

          <div className='mt-3 flex items-center justify-center gap-x-1'>
            <span className='text-xs text-black dark:text-white md:text-sm'>Bạn chưa có tài khoản?</span>
            <Link
              to={path.register}
              className='cursor-pointer text-xs font-semibold text-black underline dark:text-white md:text-sm'
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignInPage
