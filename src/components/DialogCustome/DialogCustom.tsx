import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface DialogCustomProps {
  isOpen?: boolean
  handleClose: () => void
  children?: React.ReactNode
  className?: string
  classNameOverlay?: string
}
const DialogCustom = (props: DialogCustomProps) => {
  const { isOpen, handleClose, children, className, classNameOverlay = 'bg-black' } = props

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className={`fixed inset-0 ${classNameOverlay} bg-opacity-10`} />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto z-[999]'>
            <div className='flex min-h-full items-center justify-center p-4 text-center bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.4)]'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className={`transform rounded p-6 text-left align-middle transition-all ${className}`}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DialogCustom
