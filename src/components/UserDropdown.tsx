import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'

export function UserDropdown() {
    return (
        <Menu as="div" className="w-44 relative text-left">
            <Menu.Button>
                <div className="w-44 p-3 flex items-center border text-xs">
                    <div className="flex-1 text-left">
                        <p>이름</p>
                        <p>email@publy.co</p>
                    </div>
                    <div className="triangle-down text-gray-700" />
                </div>
            </Menu.Button>
            <Transition>
                <Menu.Items className="absolute right-0 mt-2 origin-top-right w-44 bg-white border overflow-hidden">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-gray-50'} block p-3 text-sm`}
                                href=""
                            >
                                퍼블리 밥스 보러가기
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active && 'bg-gray-50'} block p-3 text-sm`}
                                href=""
                            >
                                로그아웃
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}