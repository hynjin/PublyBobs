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
                                {/*
                                TODO: 지금은 editor라서.
                                      index에서는 '식단 등록하기'로 바뀌어야 하고,
                                      주문자 목록에 있는 사람들(탈트)만 활성화 / 나머지는 숨김 또는 비활성화 (opacity 0.4 또는 눌렀을 때 alert)
                                */}
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